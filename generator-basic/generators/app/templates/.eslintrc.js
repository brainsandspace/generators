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
  // plugins: ['import', 'redux-saga', 'react', 'jsx-a11y'],
  globals: {
    NODE_ENV: true,
    describe: true,
    it: true,
    expect: true,
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'comma-dangle': 0,
    'react/jsx-filename-extension': 0,
  },
};
