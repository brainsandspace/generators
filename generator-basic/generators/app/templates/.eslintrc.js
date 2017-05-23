/**
 * Borrowed some (not all) conventions from Scott Nonnenberg. 👍
 * https://blog.scottnonnenberg.com/eslint-part-1-exploration/
 * 
 * - Always use ‘error’ or ‘off’ instead of 0 and 2. Numbers are for real config values.
 * - Rules are in alphabetical order: first core ESLint, then plugins sorted by name.
 */

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    // ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['import', 'redux-saga', 'react', 'jsx-a11y'],
  globals: {
    NODE_ENV: true,
    describe: true,
    it: true,
    expect: true,
  },
  rules: {
    'comma-dangle': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};
