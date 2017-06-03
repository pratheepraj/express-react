module.exports = {
  "extends": ["semistandard", "standard-react"],
  "plugins": [
    "import",
    "react",
  ],
  "rules": {
    "no-console": 1,
    "import/newline-after-import": 0,
    "no-underscore-dangle": 0,
    "comma-dangle": 0,
    "max-len": [2, 100],
    "react/prop-types": 0,
    "react/jsx-no-bind": 0,
  },
  "globals":  {
    "confirm": true,
    "FileReader": true,
    "FormData": true,
  },
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": 'module'
  },
};
