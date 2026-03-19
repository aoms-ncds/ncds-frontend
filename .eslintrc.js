module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:json/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'json', 'eslint-plugin'],
  rules: {
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      // {
      //   'selector': 'default',
      //   'format': ['camelCase']
      // },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'indent': ['error', 2, { MemberExpression: 'off' }],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    // 'json/camelcase': ['error', { 'properties': 'always' }],
    'no-unused-vars': 'warn',
    'react/no-multi-comp': 'error',
    // 'import/no-unresolved': 0,
    'object-curly-spacing': ['error', 'always', { arraysInObjects: false }],
    // 'eslint-plugin/filenames': ['error', { 'extensions': ['.js', '.jsx', '.ts', '.tsx']}],
    'max-len': ['error', { code: 200 }],
    'no-redeclare': 'error',
    'no-duplicate-imports': 'error',
    // 'comma-dangle': ['error', 'always',],
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
