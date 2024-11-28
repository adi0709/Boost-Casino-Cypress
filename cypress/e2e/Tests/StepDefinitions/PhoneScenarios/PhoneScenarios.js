// <reference types="cypress" />
import {And} from "cypress-cucumber-preprocessor/steps";
import GameHomePage from "../../../../support/POM/Pages/gameHomePage";
import CustomerPage from "../../../../support/POM/Pages/CustomerPage";
import NavigationPages from "../../../../support/POM/Pages/navigationPages";
import SettingCookie from "../../../../support/SettingCookie";

const gameHomePage = new GameHomePage();
const customerPage = new CustomerPage();
const navigationPages = new NavigationPages();
const settingCookies = new SettingCookie();

Given("the user is on the Boost Casino homepage using a mobile device", () => {
    cy.viewport("iphone-x")
    //Setting up the GDPR cookie value
    settingCookies.setGdprCookies()
    gameHomePage.visit();
})

And("the user clicks on the burger icon", () => {
    navigationPages.validateNavigationBurger()
})
And("the user should see the following menu entries", (dataTable) => {
    const navItems = dataTable.rawTable.flat();
    navigationPages.validateNavigationItems(navItems)
})

When("the user selects {string} from the menu", (customerNavItem) => {
    navigationPages.selectCustomerSupportNavItem(customerNavItem);
})
Then("the user is redirected to the {string} page", (customerSupportPage) => {
    customerPage.validateCustomerSupportPageAccessed(customerSupportPage)
})

When("the user clicks on {string}", (casinoNavItem) => {
    navigationPages.selectCasinoNavItem(casinoNavItem)
});

Then("the user should see the following casino categories", (dataTable) => {
    const casinoNavItems = dataTable.rawTable.flat();
    navigationPages.validateCasinoNavItem(casinoNavItems)
});