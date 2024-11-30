const report = require("multiple-cucumber-html-reporter");
const os = require("os");

// Get system metadata
const platformName = os.type();
const platformVersion = os.release();
const deviceName = os.hostname();

// Get browser and version
const browserName = process.env.BROWSER_NAME || "chrome";
const browserVersion = process.env.BROWSER_VERSION || "latest";


report.generate({
    jsonDir: "./cypress/cucumber-json/",
    reportPath: "./cypress/cucumber-report",
    openReportInBrowser: {
        Default: true,
    },
    metadata: {
        browser: {
            name: browserName,
            version: browserVersion,
        },
        device: deviceName,
        platform: {
            name: platformName,
            version: platformVersion,
        },
    },
    customData: {
        title: "Run Info",
        data: [
            {label: "Project", value: "BoostCasino"},
            {label: "Release", value: "1.0.0"},
        ],
    }
});