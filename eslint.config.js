import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import parserVue from "vue-eslint-parser";


export default [
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  pluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      ecmaVersion: 2020,
      parser: parserVue,
    },
  },
];