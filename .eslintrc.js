module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard",
        "prettier"
    ],
    "plugins": [
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
        "camelcase": "off",
        "prettier/prettier": "error"
    }
};
