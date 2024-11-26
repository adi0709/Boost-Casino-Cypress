/// <reference types="cypress" />
import { When, Then, And } from "cypress-cucumber-preprocessor/steps";
import GameHomePage from "../../../../POM/Pages/gameHomePage";

const gameHomePage = new GameHomePage();
before(()=>{

    //Adding a cookie to make sure the GDPR prompt is not received again and again
    const COOKIE_NAME = "CookieConsent";
    const COOKIE_VALUE = true

    Cypress.on("window:before:load", window => {
        window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
    });
})

Given("the user navigates to the website", () => {
    gameHomePage.visit()
});

And("the user enters {string} in the search box", (gameName) => {
    gameHomePage.searchGame(gameName)
});

And("the game with name {string} is displayed", (gameName) => {
    gameHomePage.verifyGameInResults(gameName)
});

When("the play button is clicked",()=>{
    gameHomePage.clickPlay()
})

Then("the game starts to load",()=>{
    gameHomePage.verifyGameLoading()
})