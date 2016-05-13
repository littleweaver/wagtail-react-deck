/**
 * You should probably check out the Airbnb React/JSX style guide.
 * https://github.com/airbnb/javascript/tree/master/react
 */

module.exports = {
    "rules": {
        "quotes": [
            2,
        "single"
        ],
        "linebreak-style": [
            2,
        "unix"
        ],
        "semi": [
            2,
        "never"
        ],
        "comma-dangle": 0,
        "jsx-quotes": 1,
        "react/no-danger": 1,
        "react/no-unknown-property": 1,
        "react/no-direct-mutation-state": 1,
        "react/jsx-sort-props": 1,
        "react/no-is-mounted": 1,
        "react/sort-comp": 1,
        "react/jsx-no-bind": 1,
        "react/self-closing-comp": 1,
        "react/wrap-multilines": 1,
        "react/jsx-boolean-value": 1,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-pascal-case": 1,
        "react/prefer-es6-class": 1,
        "react/no-multi-comp": 1,
        "react/jsx-uses-react": 1,
        "react/react-in-jsx-scope": 1,
        "react/jsx-max-props-per-line": [1, {"maximum": 2}]
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    "ecmaFeatures": {
        "jsx": true,
        "experimentalObjectRestSpread": true,
        "modules": true,
        "spread": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
            "pragma": "React"
        }
    }
};
