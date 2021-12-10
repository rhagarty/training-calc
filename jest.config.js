module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "node_modules/",
    "logs/.*",
    "dist/.*",
    "pacts/.*",
    "coverage/",
    "src/logger/*",
  ],
  watchPathIgnorePatterns: [
    "node_modules/",
    "logs/",
    "dist/",
    "pacts/",
    "coverage/"
  ],
  testResultsProcessor: "jest-sonar-reporter",
  testMatch: ["<rootDir>/test/**/*.spec.ts"],
  setupFiles: ["jest-plugin-context/setup"],
};

process.env = Object.assign(process.env, {
  NUMBER_TO_ROMAN_URL: 'https://localhost/to-roman?value=',
  ROMAN_TO_NUMBER_URL: 'https://localhost/to-number?value='
});
