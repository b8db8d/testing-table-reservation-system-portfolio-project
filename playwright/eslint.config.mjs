import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/'],
  },
  {
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/fixtures/**/*.ts'],
    rules: {
      'no-empty-pattern': 'off',
    },
  },
];
