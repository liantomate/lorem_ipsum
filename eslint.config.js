import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores([
		"**/node_modules/",
		"**/dist/",
		"**/build/",
		"**/coverage/",
	]),

	{
		files: ["**/*.{js,mjs,cjs,ts,tsx}"],

		extends: [js.configs.recommended],
	},

	{
		files: ["**/*.{ts,tsx}"],

		extends: [tseslint.configs.recommended],

		rules: {
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "variable",
					format: ["camelCase", "UPPER_CASE"],
				},
				{
					selector: "function",
					format: ["camelCase"],
				},
				{
					selector: "parameter",
					format: ["camelCase"],
				},
				{
					selector: "class",
					format: ["PascalCase"],
				},
				{
					selector: "typeLike",
					format: ["PascalCase"],
				},
				{
					selector: "enumMember",
					format: ["PascalCase"],
				},
			],

			"id-length": [
				"error",
				{
					min: 2,
					properties: "never",
					exceptions: ["i", "j", "k"],
				},
			],

			"max-depth": ["error", 3],
			complexity: ["warn", 8],

			curly: ["error", "multi-line"],

			"no-magic-numbers": [
				"warn",
				{
					ignore: [-1, 0, 1],
					ignoreArrayIndexes: true,
					enforceConst: true,
				},
			],

			"jsdoc/require-jsdoc": [
				"error",
				{
					publicOnly: true,
					require: {
						FunctionDeclaration: true,
						MethodDefinition: true,
						ClassDeclaration: true,
					},
				},
			],

			"jsdoc/require-param": "error",
			"jsdoc/require-returns": "error",
			"jsdoc/require-throws": "error",
		},

		plugins: {
			jsdoc,
		},
	},

	{
		files: ["apps/web/src/**/*.{ts,tsx}"],

		extends: [
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],

		languageOptions: {
			globals: globals.browser,
		},
	},

	{
		files: [
			"apps/web/vite.config.ts",
			"infrastructure/**/*.{js,mjs,cjs,ts}",
		],

		languageOptions: {
			globals: globals.node,
		},
	},
]);
