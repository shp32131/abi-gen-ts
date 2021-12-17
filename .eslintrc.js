// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": ['off']
    }
})
