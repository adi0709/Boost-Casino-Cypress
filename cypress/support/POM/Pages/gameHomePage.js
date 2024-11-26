class GameHomePage {
    constructor() {
        // Defining locators as properties
        this.searchInput = "[data-cy='filter_search']";
        this.gameCards = ".sc-dIouRR"
        this.gameText = "h6";
        this.playButton = "[type='button']";
        this.languageDropdow = "[data-cy='navDropdown-language']"
        this.languageOption = "[data-af='nav']"
    }

    // Method to visit the home page
    visit() {
        //Intercepting a request which will be used to wait to make sure the loading is complete
        cy.intercept({
            method: "POST",
            url: "https://region1.analytics.google.com/g/collect?v=2**",
        }).as("lastRequest");

        //Visiting the home page, getting the value from baseUrl
        cy.visit("/");

        //Validating the Title and the URL of the site is correct
        cy.title().should("eq", "A No Account Casino Online | Play at Boost Casino")
        cy.url().should("eq", Cypress.config().baseUrl)

        //Waiting for the request for the loading of the site to complete
        cy.wait("@lastRequest", {timeout: 5000})
            .its("response.statusCode")
            .should("eq", 204);
    }


    // Method to search for a game
    searchGame(gameName) {
        cy.get(this.searchInput)
            .should("exist", "Validating the Search area exists")
            .should("be.visible", "Validating the Search area is visible")

        cy.intercept({
            method: "GET",
            url: "https://www.boostcasino.com/api/casino/games/search?**"
        }).as("searchGame")

        //Typing the name of the game in the search box
        cy.get(this.searchInput).type(gameName);

        cy.wait("@searchGame", {timeout: 5000})
    }

    // Method to verify games appear in search results
    verifyGameInResults(gameName) {
        //Getting the first game card and validating the text of the game to match the one we want
        cy.get(this.gameCards)
            .first()
            .within(() => {

                cy.get(this.gameText).should(($el) => {
                    const actualText = $el.text().toLowerCase();
                    expect(actualText).to.include(gameName.toLowerCase());
                });
            })
    }

    // Method to click the Play button
    clickPlay() {
        //Clicking the game

        cy.get(this.gameCards)
            .first()
            .within(() => {
                cy.get(this.playButton)
                    .should("contain.text", "Play")
                    .click();
            });
    }


    openLanguageDropDown() {
        cy.get(this.languageDropdow)
            .should("be.visible")
            .click();
    }

    selectLanguage(languageName) {
        cy.intercept({
            method: "POST",
            url: "/api/casino/jackpots/pots"
        }).as("languageUpdateComplete")

        cy.get(this.languageOption)
            .first().should("be.visible", "Validating the language option dropdown navigation is visible")
            .within((el) => {
                cy.get("li").should("have.length", 3, "Validating the list has 3 language elements in the list except for the selected one")
                cy.contains(languageName).click();
            })

        cy.wait("@languageUpdateComplete", {timeout: 20000});
    }

    validateLanguageUpdate(languageValue) {
        //validating the lang from the value of lang used in HTML tag
        cy.document().then((doc) => {
            const lang = doc.documentElement.getAttribute('lang');
            expect(lang).to.eq(languageValue.toLowerCase(), "Validating the HTML tag has lang attribute with the correct language name");
        });

    }

    //validating the language value from Get the app text
    validateLoginTextLanguageUpdate(loginText) {
        cy.contains(loginText).should("be.visible", "Validating the login text reads the correct text i each language");
    }

    //Validating the language name in the URL
    validateUrlAfterLanguageUpdate(languageName) {
        cy.url().should("eq", `${Cypress.config().baseUrl}${languageName.toLowerCase()}`, "Validating the URL has the language name in the URL itself");
    }
}

export default GameHomePage;
