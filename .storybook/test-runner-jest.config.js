import { getJestConfig } from "@storybook/test-runner";

// Storybook 10 loads .storybook/test-runner.* through module.register(), which
// Jest 30 rejects. Register the test-runner hooks from a Jest setup file instead.
const config = getJestConfig();

export default {
  ...config,
  setupFilesAfterEnv: [
    ...config.setupFilesAfterEnv,
    "<rootDir>/.storybook/test-runner-hooks.js",
  ],
};
