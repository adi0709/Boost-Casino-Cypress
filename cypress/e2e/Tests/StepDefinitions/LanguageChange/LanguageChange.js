/// <reference types="cypress" />
import {And, Then, When} from "cypress-cucumber-preprocessor/steps";
import GameHomePage from "../../../../support/POM/Pages/gameHomePage";

const gameHomePage = new GameHomePage();
before(() => {

    //Adding a cookie to make sure the GDPR prompt is not received again and again
    const COOKIE_NAME = "CookieConsent";
    const COOKIE_VALUE = true

    Cypress.on("window:before:load", window => {
        window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
    });
})

When("the user opens the language dropdown", () => {
    gameHomePage.openLanguageDropDown();
})
And("the user select the {string} language option", (language) => {
    gameHomePage.selectLanguage(language);
})
Then("the user should see the page content in {string}", (languageValue, loginText) => {
    gameHomePage.validateLanguageUpdate(languageValue)
})

And("login text reads {string}", (loginText) => {
    gameHomePage.validateLoginTextLanguageUpdate(loginText)
})

And("the url has {string} in the url", (language) => {
    gameHomePage.validateUrlAfterLanguageUpdate(language)
})