import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.test.ts',
      '**/*.test.js',
      '**/test/**',
      'eslint.config.js',
    ],
  },
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    eslintPluginPrettier,
    {
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        globals: {
          // ES2015 globals
          Promise: 'readonly',
          Symbol: 'readonly',
          // Node.js globals
          process: 'readonly',
          module: 'readonly',
          require: 'readonly',
          __dirname: 'readonly',
          __filename: 'readonly',
          exports: 'readonly',
          // Jest globals
          jest: 'readonly',
          describe: 'readonly',
          it: 'readonly',
          expect: 'readonly',
          beforeEach: 'readonly',
          afterEach: 'readonly',
          // Other globals
          Atomics: 'readonly',
          SharedArrayBuffer: 'readonly',
        },
      },
      rules: {
        'prettier/prettier': 'error',
        'no-console': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'comma-dangle': 'off',
        'no-unused-vars': 'off',
        camelcase: 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    }
  ),
];
