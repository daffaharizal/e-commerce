module.exports = {
  env: {
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:unicorn/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    // Allows for the parsing of modern ECMAScript features if you're using modern node.js or frontend bundling
    // this will be inferred from tsconfig if left commented
    // ecmaVersion: 2020,
    sourceType: 'module' // Allows for the use of imports
    // Allows for the parsing of JSX if you are linting React
    // ecmaFeatures: {
    //  jsx: true
    // }
  },
  rules: {
    'unicorn/filename-case': [
      'warn',
      {
        cases: {
          camelCase: true,
          pascalCase: true
        }
      }
    ],
    'no-debugger': 'off',
    'unicorn/consistent-function-scoping': 0,
    'unicorn/prevent-abbreviations': 0
  },
  plugins: ['@typescript-eslint', 'import', 'prefer-arrow', 'unicorn'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};
