/// <reference types="cypress" />
import {And, Then, When} from "cypress-cucumber-preprocessor/steps";
import GameHomePage from "../../../../support/POM/Pages/gameHomePage";
import BookOfDeadGamePage from "../../../../support/POM/Pages/bookOfDeadGamePage";
import SettingCookie from "../../../../support/SettingCookie";

const gameHomePage = new GameHomePage();
const bookOfDeadGamePage = new BookOfDeadGamePage();
const settingCookies = new SettingCookie();

Given("the user is on the Boost Casino homepage", () => {
    //Setting up the GDPR cookie value
    settingCookies.setGdprCookies()
    gameHomePage.visit()
});

And("the user enters {string} in the search box", (gameName) => {
    gameHomePage.searchGame(gameName)
});

And("the game with name {string} is displayed", (gameName) => {
    gameHomePage.verifyGameInResults(gameName)
});

When("the play button is clicked", () => {
    gameHomePage.clickPlay()
})

Then("the game starts to load", () => {
    bookOfDeadGamePage.verifyGameLoading()
})