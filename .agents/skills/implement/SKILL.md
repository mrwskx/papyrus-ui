---
name: implement
description: Read a GitHub issue and implement the fix or feature. Never closes, comments on, or edits the issue. Invoked explicitly only — by the user locally, or by the claude-implement workflow under GitHub Actions.
disable-model-invocation: true
---

# Implement

Read a GitHub issue and implement the fix or feature.

## Surface

Steps 4–6 differ depending on where the skill runs. Check once, up front:

```bash
[ -n "$GITHUB_ACTIONS" ] && echo unattended || echo local
```

- **local** — a supervised session. You summarize and stop; the user commits.
- **unattended** — a GitHub Actions run. There is no user and the runner is destroyed when the job ends, so uncommitted work is lost. Commit as you go and finish with a draft PR.

Everything before Step 4 is identical on both surfaces.

## Step 1 — Resolve issue number

**Completion criterion:** one confirmed issue number in hand.

1. If an argument was passed (`/implement 42`), use it.
2. Else parse the current branch name for a leading integer (e.g. `42-fix-login` → `42`). Confirm with the user: "Found issue #42 from branch name — correct?"
3. If neither yields a number, prompt: "Which issue number should I implement?"

## Step 2 — Read the issue

```bash
gh issue view <number> --json title,body,comments
```

Parse: title, body, and any clarifying comments. Build a clear mental model of what "done" looks like before touching any code.

**Never run `gh issue close`, `gh issue edit`, or `gh issue comment`.** This skill only reads issue state — closing happens when the merged PR references the issue, which is outside this skill's scope.

## Step 3 — Prepare the branch

```bash
# check for existing branch referencing the issue number
git branch --list "*<number>-*" --all
```

- Branch exists → `git checkout <branch>`
- Branch missing → switch to main first, then create:
  ```bash
  git checkout main
  git pull
  git checkout -b <number>-<kebab-slug-of-title>
  ```

## Step 4 — Implement

Read `docs/agents/code-style.md` before writing code.

Invoke `/ponytail` before writing any code — stop at the first rung that holds.

Use `/tdd` where behaviors have clear, pre-agreed seams. Otherwise implement directly with ponytail principles.

Write in vertical slices — one behavior at a time. No speculative code, no abstractions beyond what the issue requires.

Run typechecking and single test files regularly throughout. Run the full test suite once at the end.

**Unattended only:** invoke `/commit-changes` after each vertical slice, as soon as its tests pass. An unattended run can be cut short by a turn cap or a job timeout at any point — committing per slice means what it finished so far survives as a reviewable branch instead of being discarded with the runner.

**Completion criterion:** the issue's acceptance criteria are met, all existing tests pass, and no code exists that the issue didn't require.

## Step 5 — Review

**Local only.** Invoke `/code-review` on the completed work before summarizing.

Skip this step when unattended. `/code-review` fans out three parallel sub-agents, and an unattended run's output is a draft PR that gets reviewed anyway — locally, or by commenting `@claude` on the PR.

## Step 6 — Finish

### Local

Output a concise summary:

- Implements `#<number> — <title>`
- Branch: `<branch-name>`
- What changed: one bullet per file modified, one line each
- Tests added (if any): one bullet per test, one line each
- What was deliberately skipped (ponytail tradeoffs, if any)

**Do not commit.** Stop here — committing is the user's next step.

### Unattended

Commit anything still uncommitted with `/commit-changes`, then invoke `/open-pr --draft`.

Report the same summary as the local path, plus the PR URL. Do not comment on, edit, or close the issue — the constraint from Step 2 holds on both surfaces. The draft PR is the whole output; linking it back to the issue is the reviewer's call.
