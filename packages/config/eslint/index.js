// Shared ESLint flat config for every package of the monorepo.
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

/** Import boundaries between packages (see Confluence « Architecture » §3). */
const BOUNDARIES = {
  shared: [
    { group: ['phaser', 'phaser/*'], message: 'shared must stay engine-agnostic (no Phaser).' },
    { group: ['@nestjs/*'], message: 'shared must stay framework-agnostic (no NestJS).' },
    {
      group: ['@tss/game', '@tss/api', '@tss/content'],
      message: 'shared cannot depend on apps or content.',
    },
  ],
  content: [{ group: ['@tss/game', '@tss/api'], message: 'content cannot depend on apps.' }],
  game: [{ group: ['@tss/api', '@nestjs/*'], message: 'game cannot import the API code.' }],
  api: [
    { group: ['@tss/game', 'phaser', 'phaser/*'], message: 'api cannot import the game code.' },
  ],
};

/**
 * @param {{ tsconfigRootDir: string, boundary: keyof typeof BOUNDARIES }} options
 */
export function createConfig({ tsconfigRootDir, boundary }) {
  return tseslint.config(
    { ignores: ['dist/**', 'coverage/**', '.turbo/**'] },
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: { projectService: true, tsconfigRootDir },
      },
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              ...BOUNDARIES[boundary],
              { group: ['../../*'], message: 'Use a path alias instead of deep relative imports.' },
            ],
          },
        ],
        'no-restricted-syntax': [
          'error',
          { selector: 'ExportDefaultDeclaration', message: 'Use named exports (see Conventions).' },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      },
    },
    {
      // Config files (eslint.config.js…) are plain JS, outside the TS project.
      files: ['**/*.{js,mjs,cjs}'],
      extends: [tseslint.configs.disableTypeChecked],
      rules: { 'no-restricted-syntax': 'off' },
    },
    prettier,
  );
}
