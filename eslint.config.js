import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

const sharedPlugins = {
  react,
  "react-hooks": reactHooks,
  "react-refresh": reactRefresh,
  "jsx-a11y": jsxA11y,
};

const sharedRules = {
  ...react.configs.flat.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  ...reactRefresh.configs.vite.rules,
  ...jsxA11y.configs.recommended.rules,
  "react/react-in-jsx-scope": "off",
  "react/jsx-uses-react": "off",
  "react/prop-types": "off",
  "react/no-unescaped-entities": "off",
};

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: sharedPlugins,
    settings: { react: { version: "detect" } },
    rules: {
      ...js.configs.recommended.rules,
      ...sharedRules,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: sharedPlugins,
    settings: { react: { version: "detect" } },
    rules: sharedRules,
  },
];
