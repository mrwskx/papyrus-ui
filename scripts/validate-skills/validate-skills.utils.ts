import { resolve } from 'node:path';

// Tolerates the cell padding Prettier adds when it aligns Markdown tables.
const SKILL_ROW = /\|[ \t]*`([a-z-]+)`[ \t]*\|/g;

export function extractSkills(markdown: string): string[] {
  return [...markdown.matchAll(SKILL_ROW)].map(match => match[1]);
}

export interface MissingSkill {
  skill: string;
  path: string;
}

export function findMissingSkills(
  skills: string[],
  exists: (path: string) => boolean,
): MissingSkill[] {
  return skills
    .map(skill => ({ skill, path: `.claude/skills/${skill}/SKILL.md` }))
    .filter(({ path }) => !exists(path));
}

export type SymlinkIssue =
  { kind: 'not-symlink' } | { kind: 'wrong-target'; target: string };

// Both directories sit at the repo root, so the link target is resolved
// relative to .claude/ — the directory the symlink itself lives in.
const CLAUDE_DIR = '.claude';
const SKILLS_DIR = '.agents/skills';

export function findSymlinkIssue(
  target: string | null,
): SymlinkIssue | undefined {
  if (target === null) {
    return { kind: 'not-symlink' };
  }

  if (resolve(CLAUDE_DIR, target) !== resolve(SKILLS_DIR)) {
    return { kind: 'wrong-target', target };
  }

  return undefined;
}
