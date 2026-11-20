// Commit message rules (see Confluence « Conventions » §3 and ADR-008).
// Format: <type>(<scope>): TSS-<num> <description>

const TYPES = [
  'feat',
  'fix',
  'perf',
  'refactor',
  'test',
  'docs',
  'chore',
  'ci',
  'build',
  'content',
];

const SCOPES = [
  'game',
  'api',
  'shared',
  'content',
  'combat',
  'narration',
  'exploration',
  'progression',
  'ui',
  'audio',
  'i18n',
  'docker',
  'ci',
  'deps',
  'repo',
];

/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  // Dependabot updates and release commits have no Jira key.
  ignores: [
    (message) => /^(chore|build)\(deps(-dev)?\): bump /.test(message),
    (message) => /^chore\(release\): /.test(message),
  ],
  plugins: [
    {
      rules: {
        'jira-key': ({ subject }) => [
          /^TSS-\d+ \S/.test(subject ?? ''),
          'the subject must start with the Jira key, e.g. "TSS-12 ajoute la réaction Vapeur"',
        ],
      },
    },
  ],
  rules: {
    'type-enum': [2, 'always', TYPES],
    'scope-enum': [2, 'always', SCOPES],
    'scope-empty': [2, 'never'],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
    'jira-key': [2, 'always'],
  },
};
