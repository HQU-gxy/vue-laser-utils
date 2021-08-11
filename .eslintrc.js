module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "./eslintrc/crosstyan.eslint",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  rules: {
    "no-console": "off"
  }
}