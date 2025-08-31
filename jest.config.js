module.exports = {
  testEnvironment: "jsdom", // required for React components
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // supports JSX and ES6+
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // RTL matchers
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/tests/backend/"], // ignore backend tests
  verbose: true,
};
