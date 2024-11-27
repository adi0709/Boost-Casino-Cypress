// <reference types="cypress" />
import {And} from "cypress-cucumber-preprocessor/steps";
import GameHomePage from "../../../../support/POM/Pages/gameHomePage";
import CustomerPage from "../../../../support/POM/Pages/CustomerPage";
import NavigationPages from "../../../../support/POM/Pages/navigationPages";

const gameHomePage = new GameHomePage();
const customerPage = new CustomerPage();
const navigationPages = new NavigationPages();


Given("the GDPR cookies are provided", () => {
    //Adding a cookie to make sure the GDPR prompt is not received again and again
    const COOKIE_NAME = "CookieConsent";
    const COOKIE_VALUE = true
    Cypress.on("window:before:load", window => {
        window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
    });
})

Given("the user is on the Boost Casino homepage using a mobile device", () => {
    cy.viewport("iphone-x")
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