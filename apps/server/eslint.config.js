import eslint from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const tsConfig = tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
  files: ['**/*.{js,jsx,ts,tsx}'],
  ignores: ['**/dist/*', '**/node_modules/*'],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: {
    prettier: pluginPrettier,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
});

export default tsConfig;
