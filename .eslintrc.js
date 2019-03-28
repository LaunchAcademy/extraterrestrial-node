module.exports = {
  env: {
    "jest/globals": true
  },
  extends: "airbnb",
  plugins: ["react", "import", "jest"],
  rules: {
    semi: ["error", "never"],
    quotes: ["warning", "double"],
    "space-before-function-paren": "off"
  },
  settings: {
    "import/resolver": {
      node: { extensions: [".js", ".mjs"] }
    }
  }
};
