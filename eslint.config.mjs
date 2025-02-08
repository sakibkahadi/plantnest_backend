import js from '@eslint/js';
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.ts", "**/*.js"], // Fixed file pattern
        ignores: ["dist/**", "node_modules/**"],
        languageOptions: {
            parser, // TypeScript parser
            ecmaVersion: "latest", // Latest ECMAScript version
            sourceType: "module", // Use ES modules
            parserOptions: {
                project: "./tsconfig.json", // Path to your tsconfig.json
            },
        },
        plugins: {
            "@typescript-eslint": tseslint, // TypeScript ESLint plugin
        },
        rules: {
            ...js.configs.recommended.rules, // ESLint recommended rules
            ...tseslint.configs.recommended.rules, // TypeScript recommended rules
            "no-unused-vars": "error", // Error on unused variables
            "no-undef": "off", // Error on undefined variables
            "prefer-const": "error", // Prefer `const` over `let`
            "no-console": "warn", // Warn on `console` usage
        },
    },
];