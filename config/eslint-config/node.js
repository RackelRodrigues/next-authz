/** @type {import('eslint').Linter.Config} */

Module.exports = {
  extends: ["@rocketseat/eslint-config/node"],
  Plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
  },
};
