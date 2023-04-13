module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',

    //
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    '@typescript-eslint/naming-convention': [
      'error',
      // {
      //   'selector': 'default',
      //   'format': ['camelCase']
      // },
      {
        'selector': 'parameter',
        'format': ['camelCase'],
        'leadingUnderscore': 'allow',
      },
      {
        'selector': 'memberLike',
        'modifiers': ['private'],
        'format': ['camelCase'],
        'leadingUnderscore': 'require',
      },
      {
        'selector': 'typeLike',
        'format': ['PascalCase'],
      },
    ],
    'no-multiple-empty-lines': ['error', { 'max': 2 }],
    'indent': [
      'error',
      2,
      { 'MemberExpression': 'off' },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'import/no-unresolved': 0,
    'object-curly-spacing': ['error', 'always', { 'arraysInObjects': false }],
    'max-len': ['error', { 'code': 200 }],
    // 'comma-dangle': ['error', 'always',],
  },
};
