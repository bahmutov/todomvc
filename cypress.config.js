const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "r9294v",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://glebbahmutov.com/todomvc",
  },
});
