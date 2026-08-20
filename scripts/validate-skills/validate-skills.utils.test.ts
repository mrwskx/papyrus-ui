import { describe, expect, it } from 'vitest';

import {
  extractSkills,
  findMissingSkills,
  findSymlinkIssue,
} from './validate-skills.utils';

describe('findSymlinkIssue', () => {
  it('reports not-symlink when .claude/skills is a real directory', () => {
    expect(findSymlinkIssue(null)).toEqual({ kind: 'not-symlink' });
  });

  it('accepts the link the repo actually uses', () => {
    expect(findSymlinkIssue('../.agents/skills')).toBeUndefined();
  });

  it('reports wrong-target when the link points elsewhere', () => {
    expect(findSymlinkIssue('../elsewhere/skills')).toEqual({
      kind: 'wrong-target',
      target: '../elsewhere/skills',
    });
  });

  it('normalises the target rather than comparing it as a string', () => {
    expect(findSymlinkIssue('../.agents/skills/')).toBeUndefined();
    expect(findSymlinkIssue('../.agents/../.agents/skills')).toBeUndefined();
  });
});

describe('extractSkills', () => {
  it('extracts skill names from table rows', () => {
    const markdown = '| `grilling` | "grill me" |\n| `tdd` | "test-first" |';

    expect(extractSkills(markdown)).toEqual(['grilling', 'tdd']);
  });

  it('tolerates the cell padding Prettier adds to aligned tables', () => {
    expect(extractSkills('|   `tdd`   | "test-first" |')).toEqual(['tdd']);
  });

  it('ignores table cells that are not backtick-wrapped', () => {
    const markdown = '| tdd | "test-first" |\n| `research` | "look up" |';

    expect(extractSkills(markdown)).toEqual(['research']);
  });

  it('ignores names containing uppercase letters', () => {
    expect(extractSkills('| `NotASkill` | x |\n| `open-pr` | y |')).toEqual([
      'open-pr',
    ]);
  });

  it('returns an empty array when no skill rows are present', () => {
    expect(extractSkills('# Heading\n\n| Skill | Trigger |')).toEqual([]);
  });
});

describe('findMissingSkills', () => {
  it('returns nothing when every documented skill has a SKILL.md', () => {
    expect(findMissingSkills(['tdd'], () => true)).toEqual([]);
  });

  it('reports the path it expected the skill to live at', () => {
    expect(findMissingSkills(['tdd'], () => false)).toEqual([
      { skill: 'tdd', path: '.claude/skills/tdd/SKILL.md' },
    ]);
  });

  it('reports only the skills that are absent', () => {
    const present = new Set(['.claude/skills/research/SKILL.md']);

    expect(
      findMissingSkills(['tdd', 'research'], path => present.has(path)),
    ).toEqual([{ skill: 'tdd', path: '.claude/skills/tdd/SKILL.md' }]);
  });

  it('returns nothing when no skills are documented', () => {
    expect(findMissingSkills([], () => false)).toEqual([]);
  });
});
