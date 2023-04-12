module.exports = {
  extends: [
    "semistandard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": "off",
    "no-unused-vars": ["warn"],
    "multiline-ternary": "off",
    "react/prop-types": "off",
    "no-console": ["warn"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
