module.exports = {
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaVersion: 2017,
      sourceType: "module",
      ecmaFeatures: {
         globalReturn: false,
         impliedStrict: true,
         jsx: false
      },
      tsconfigRootDir: __dirname,
      project: "./tsconfig.json"
   },
   plugins: [
      "@typescript-eslint",
      "functional"
   ],
   extends: [
      "@autumnblaze/eslint-config-h"
   ],
   env: {
      node: true
   },
   rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-throw-literal": "off",
      "@typescript-eslint/no-type-alias": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/init-declarations": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/promise-function-async": "off",
      "@typescript-eslint/require-array-sort-compare": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/space-before-function-paren": ["error", {
         "anonymous": "never",
         "named": "never",
         "asyncArrow": "always"
      }],
      "functional/no-class": "error",
      "functional/prefer-type-literal": "error"
   }
};
