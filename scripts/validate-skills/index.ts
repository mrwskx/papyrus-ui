import { access, lstat, readFile, readlink } from 'node:fs/promises';

import {
  extractSkills,
  findMissingSkills,
  findSymlinkIssue,
} from './validate-skills.utils';

const SKILLS_DIR = '.agents/skills';
const CLAUDE_SKILLS_DIR = '.claude/skills';

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const claudeMd = await readFile('CLAUDE.md', 'utf-8');

// The Skills tables are a routing table for model-invoked skills, not an
// inventory: user-invoked and generic skills are deliberately unlisted, so only
// what the tables name is checked.
const documented = extractSkills(claudeMd);

// findMissingSkills takes a synchronous predicate so it stays pure and trivially
// testable; resolve the filesystem answers up front and hand it a lookup.
const presentPaths = new Set(
  (
    await Promise.all(
      documented.map(async skill => {
        const path = `${CLAUDE_SKILLS_DIR}/${skill}/SKILL.md`;
        return (await exists(path)) ? path : undefined;
      }),
    )
  ).filter(path => path !== undefined),
);
const missing = findMissingSkills(documented, path => presentPaths.has(path));

// A single directory symlink, not one per skill: .claude/skills -> ../.agents/skills.
const stats = await lstat(CLAUDE_SKILLS_DIR);
const symlinkIssue = findSymlinkIssue(
  stats.isSymbolicLink() ? await readlink(CLAUDE_SKILLS_DIR) : null,
);

for (const { skill, path } of missing) {
  console.error(`Missing: ${skill} → ${path}`);
}
if (symlinkIssue?.kind === 'not-symlink') {
  console.error(`Not a symlink: ${CLAUDE_SKILLS_DIR} → ${SKILLS_DIR}`);
}
if (symlinkIssue?.kind === 'wrong-target') {
  console.error(
    `Wrong symlink target: ${CLAUDE_SKILLS_DIR} → ${symlinkIssue.target}, expected ${SKILLS_DIR}`,
  );
}

const total = missing.length + (symlinkIssue ? 1 : 0);
if (total > 0) {
  throw new Error(`${total.toFixed()} issue(s) found.`);
}

console.log(
  `All ${documented.length.toFixed()} documented skills present. Symlink in sync.`,
);
