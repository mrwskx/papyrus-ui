// Authorization for `Skill(implement)` under GitHub Actions.
//
// The skill is model-invocable, so Claude decides *whether* a comment meant
// "implement". These rules decide whether it is *allowed to*, from facts a
// human set deliberately: the issue's state, its labels, and its author's
// association. The agent runs with `issues: write` and so *could* rewrite any
// of them — nothing here is tamper-proof. What it cannot do is rewrite them
// unseen: every such edit lands in the issue timeline.

const TRUSTED_AUTHORS = new Set(['OWNER', 'MEMBER', 'COLLABORATOR']);

export const AGENT_LABEL = 'ready-for-agent';

export interface IssueFacts {
  number: number;
  state: string;
  labels: string[];
  authorAssociation: string;
  isPullRequest: boolean;
}

/** The `gh api repos/{repo}/issues/{number}` fields the decision reads. */
export interface IssuePayload {
  number: number;
  state: string;
  labels: { name: string }[];
  author_association: string;
  /** Present only when the number names a pull request — the endpoint serves both. */
  pull_request?: object;
}

/** A payload missing any required field throws here, and the caller denies. */
export function toIssueFacts(payload: IssuePayload): IssueFacts {
  return {
    number: payload.number,
    state: payload.state,
    labels: payload.labels.map(label => label.name),
    authorAssociation: payload.author_association,
    isPullRequest: payload.pull_request !== undefined,
  };
}

export type Decision = { allow: true } | { allow: false; reason: string };

/**
 * `job` is the workflow job asking — `implement` and `pr` can do the work,
 * `converse` is the read-only tier and must escalate instead.
 */
export function decide(facts: IssueFacts, job: string): Decision {
  if (facts.isPullRequest) {
    return {
      allow: false,
      reason:
        'The implement skill is issue-scoped, and this is a pull request. ' +
        'Work the diff directly instead.',
    };
  }

  // Checked before the label: "this issue is closed" is a more useful answer
  // than "this issue is not labelled" for a closed issue that carries one.
  if (facts.state === 'closed') {
    return {
      allow: false,
      reason:
        `Issue #${facts.number} is closed. If the work is genuinely outstanding, ` +
        'reopen it; a closed issue is not a request.',
    };
  }

  if (!facts.labels.includes(AGENT_LABEL)) {
    return {
      allow: false,
      reason:
        `Not authorized: issue #${facts.number} is not labelled \`${AGENT_LABEL}\`. ` +
        'Say so on the thread and stop — applying the label is a maintainer decision.',
    };
  }

  if (!TRUSTED_AUTHORS.has(facts.authorAssociation)) {
    return {
      allow: false,
      reason:
        `Not authorized: issue #${facts.number} was opened by an outside author ` +
        `(${facts.authorAssociation}), so its body is untrusted input. It needs rewriting ` +
        'as a maintainer-authored spec with `/to-spec` first.',
    };
  }

  if (job === 'converse') {
    return {
      allow: false,
      reason:
        'Authorized, but this job is read-only and cannot finish an implementation. ' +
        'Escalate instead, then stop:\n\n' +
        `    gh workflow run claude.yml -f issue=${facts.number}`,
    };
  }

  return { allow: true };
}
