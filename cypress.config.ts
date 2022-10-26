import { defineConfig } from "cypress";

module.exports = defineConfig({
  viewportWidth: 1300,
  viewportHeight: 750,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
