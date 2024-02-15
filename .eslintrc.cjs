module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'unused-imports', '@emotion'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-duplicates': ['error'],
    'import/no-namespace': ['error'],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'never',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'react-hooks/exhaustive-deps': [
      'warn',
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
  },
};
