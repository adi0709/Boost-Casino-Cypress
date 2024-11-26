const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    chromeWebSecurity: false,
    html: {
      enabled: true,
    },
    viewportWidth: 1000,
    viewportHeight: 660,
    baseUrl: "https://www.boostcasino.com/",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
  },
});