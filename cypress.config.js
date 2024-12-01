const {defineConfig} = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const {configureAllureAdapterPlugins} = require("@mmisty/cypress-allure-adapter/plugins");

module.exports = defineConfig({
    e2e: {
        specPattern: "**/*.feature",
        chromeWebSecurity: false,
        video: true,
        screenshotOnRunFailure: true,
        html: {
            enabled: true,
        },
        viewportWidth: 1280,
        viewportHeight: 800,
        baseUrl: "https://www.boostcasino.com/",
        setupNodeEvents(on, config) {
            on("file:preprocessor", cucumber());
            configureAllureAdapterPlugins(on, config);

            return config;
        },
        env: {
            allure: true,
            allureLogCyCommands: true,
            allureAddVideoOnPass: true,

        }
    },
});