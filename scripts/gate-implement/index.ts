// PreToolUse hook for `Skill(implement)`. Exit 2 denies the call and shows
// stderr to Claude; exit 0 allows it.

import { execFile } from 'node:child_process';
import { appendFile } from 'node:fs/promises';
import { promisify } from 'node:util';

import { decide, toIssueFacts } from './gate-implement.utils';
import type { IssueFacts, IssuePayload } from './gate-implement.utils';

const execFileAsync = promisify(execFile);

// Hand the refusal to the job as well as to Claude. A failed step is silent on
// the thread, and `scripts/report-run` quotes this verbatim rather than
// inventing a second wording for a decision made here.
async function deny(reason: string): Promise<void> {
  console.error(reason);
  process.exitCode = 2;

  const env = process.env.GITHUB_ENV;
  if (env) {
    await appendFile(env, `GATE_REASON<<__GATE__\n${reason}\n__GATE__\n`);
  }
}

async function main(): Promise<void> {
  // Local sessions are supervised — the gate exists for unattended runs only.
  if (!process.env.GITHUB_ACTIONS) {
    return;
  }

  const repo = process.env.GITHUB_REPOSITORY;
  const issue = process.env.GATE_ISSUE;

  if (!repo || !issue) {
    await deny(
      'Gate cannot verify this run (GITHUB_REPOSITORY or GATE_ISSUE unset). Denying.',
    );
    return;
  }

  // GATE_ISSUE names the issue; the facts always come from the API, so pointing
  // the gate at another number cannot invent a label on it.
  let facts: IssueFacts;
  try {
    const { stdout } = await execFileAsync('gh', [
      'api',
      `repos/${repo}/issues/${issue}`,
    ]);
    facts = toIssueFacts(JSON.parse(stdout) as IssuePayload);
  } catch (error) {
    await deny(
      `Gate could not read issue #${issue}: ${String(error)}. Denying.`,
    );
    return;
  }

  const decision = decide(facts, process.env.GATE_JOB ?? '');
  if (!decision.allow) {
    await deny(decision.reason);
  }
}

await main();
