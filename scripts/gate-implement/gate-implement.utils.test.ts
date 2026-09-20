import { describe, it, expect } from 'vitest';
import { decide, toIssueFacts, AGENT_LABEL } from './gate-implement.utils';
import type { IssueFacts } from './gate-implement.utils';

// An issue a maintainer marked ready. Every case below is this one with
// something taken away.
const authorized: IssueFacts = {
  number: 159,
  state: 'open',
  labels: [AGENT_LABEL, 'feature'],
  authorAssociation: 'OWNER',
  isPullRequest: false,
};

describe('toIssueFacts', () => {
  const payload = {
    number: 159,
    state: 'open',
    labels: [{ name: AGENT_LABEL }, { name: 'feature' }],
    author_association: 'OWNER',
  };

  it('flattens the labels and renames the author association', () => {
    expect(toIssueFacts(payload)).toEqual(authorized);
  });

  // The endpoint serves pull requests under the same path, and only this field
  // tells the two apart.
  it('reads a pull request off the pull_request field', () => {
    expect(toIssueFacts({ ...payload, pull_request: {} }).isPullRequest).toBe(
      true,
    );
  });
});

describe('decide', () => {
  it('allows an authorized issue from the implement job', () => {
    expect(decide(authorized, 'implement')).toEqual({ allow: true });
  });

  it('allows an authorized issue from the pr job', () => {
    expect(decide(authorized, 'pr')).toEqual({ allow: true });
  });

  it('denies a pull request, whatever its labels say', () => {
    const decision = decide(
      { ...authorized, isPullRequest: true },
      'implement',
    );
    expect(decision.allow).toBe(false);
    expect(decision).toMatchObject({
      reason: expect.stringContaining('issue-scoped'),
    });
  });

  it('denies a closed issue', () => {
    const decision = decide({ ...authorized, state: 'closed' }, 'implement');
    expect(decision.allow).toBe(false);
    expect(decision).toMatchObject({
      reason: expect.stringContaining('is closed'),
    });
  });

  it('says closed rather than unlabelled when an issue is both', () => {
    const decision = decide(
      { ...authorized, state: 'closed', labels: [] },
      'implement',
    );
    expect(decision).toMatchObject({
      reason: expect.stringContaining('is closed'),
    });
  });

  it('denies an unlabelled issue', () => {
    const decision = decide(
      { ...authorized, labels: ['feature'] },
      'implement',
    );
    expect(decision.allow).toBe(false);
    expect(decision).toMatchObject({
      reason: expect.stringContaining(AGENT_LABEL),
    });
  });

  it('denies an outside-authored issue even when labelled', () => {
    const decision = decide(
      { ...authorized, authorAssociation: 'CONTRIBUTOR' },
      'implement',
    );
    expect(decision.allow).toBe(false);
    expect(decision).toMatchObject({
      reason: expect.stringContaining('/to-spec'),
    });
  });

  it('accepts MEMBER and COLLABORATOR as trusted authors', () => {
    for (const authorAssociation of ['MEMBER', 'COLLABORATOR']) {
      expect(decide({ ...authorized, authorAssociation }, 'implement')).toEqual(
        {
          allow: true,
        },
      );
    }
  });

  // The routing denial: authorized, but the read-only job cannot finish the work.
  it('tells the converse job to escalate, with the issue number in the command', () => {
    const decision = decide(authorized, 'converse');
    expect(decision.allow).toBe(false);
    expect(decision).toMatchObject({
      reason: expect.stringContaining(
        'gh workflow run claude.yml -f issue=159',
      ),
    });
  });

  it('checks authorization before routing, so converse is not told to escalate an unlabelled issue', () => {
    const decision = decide({ ...authorized, labels: [] }, 'converse');
    expect(decision).toMatchObject({
      reason: expect.stringContaining(AGENT_LABEL),
    });
  });
});
