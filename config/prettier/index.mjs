/** @typedef  {import ('prettier').Config} PrettierConfig*/

/** @type {PrettierConfig} */
const config = {
  //verify all the things here https://prettier.io/docs/en/options.html

  plugins: [import("prettier-plugin-tailwindcss")],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "auto",
  bracketSameLine: false,
};

export default config;
