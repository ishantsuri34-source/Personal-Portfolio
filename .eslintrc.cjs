module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
  ],
  plugins: ["import"],
  rules: {
    "import/no-unresolved": ["error", { caseSensitive: true }],
  },
};
