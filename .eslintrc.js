module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "standard"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "quote-props": [
      "error",
      "consistent"
    ],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
  }
}
