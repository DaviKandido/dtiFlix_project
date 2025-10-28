// eslint.config.mjs

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// 1. Importar o plugin do Prettier
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
// 2. Importar o config que desativa regras conflitantes
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  "plugin:@next/next/core-web-vitals",

  eslintConfigPrettier,

  eslintPluginPrettier,

  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  {
    rules: {
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
