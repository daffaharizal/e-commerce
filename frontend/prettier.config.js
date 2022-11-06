module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'always',
  importOrder: [
    '^react$', // Imports by "react"
    '<THIRD_PARTY_MODULES>',
    '^components/(.*)$',
    '^constant',
    '^context',
    '^helpers',
    '^hooks',
    '^reducer',
    '^types',
    '^assets/(.*)$',
    '^@fontsource/(.*)$',
    '^[./]' // Other imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
