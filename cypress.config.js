const {defineConfig} = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
    e2e: {
        specPattern: "**/*.feature",
        chromeWebSecurity: false,
        html: {
            enabled: true,
        },
        viewportWidth: 1280,
        viewportHeight: 800,
        baseUrl: "https://www.boostcasino.com/",
        setupNodeEvents(on) {
            on("file:preprocessor", cucumber());
        },
    },
});