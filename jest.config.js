// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: "jest-preset-angular",
  roots: ["src"],
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@assets/(.*)": "<rootDir>/src/assets/$1",
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@env": "<rootDir>/src/environments/environment",
    "@src/(.*)": "<rootDir>/src/src/$1",
    "@state/(.*)": "<rootDir>/src/app/state/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!(jest-test))"],
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  reporters: ["default"],
  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFiles: [
    "<rootDir>/jest-setup.ts",
  ],
};
