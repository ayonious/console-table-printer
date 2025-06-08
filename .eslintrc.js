module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-param-reassign': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-wrapper-object-types': 'error',
    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.js'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
