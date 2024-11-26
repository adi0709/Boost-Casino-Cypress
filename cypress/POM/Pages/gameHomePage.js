class GameHomePage {
    constructor() {
        // Defining locators as properties
        this.searchInput = "[data-cy='filter_search']";
        this.gameCards = ".sc-dIouRR"
        this.gameText = "h6";
        this.playButton = "[id^='\\39']";
        this.gameFrame = "[id='ax-game-iframe']"
    }

    // Method to visit the home page
    visit() {
        //Intercepting a request which will be used to wait to make sure the loading is complete
        cy.intercept({
            method: "POST",
            url: "/api/casino/jackpots/pots",
        }).as("lastRequest");

        //Visiting the home page, getting the value from baseUrl
        cy.visit("/");

        //Validating the Title and the URL of the site is correct
        cy.title().should("eq","A No Account Casino Online | Play at Boost Casino")
        cy.url().should("eq",Cypress.config().baseUrl)

        //Waiting for the request for the loading of the site to complete
        cy.wait("@lastRequest", {timeout: 20000})
            .its("response.statusCode")
            .should("eq", 200);


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

        cy.wait("@searchGame")
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
        cy.get(this.playButton).click(); // Assuming clicking the first match
    }

    // Method to verify the game is loading
    verifyGameLoading() {

        //Validating the correct Url is reached
        cy.url().should("include", "slots/book-of-dead");

        //Checking for the iFrame to be visible and have specific values
        cy.get(this.gameFrame).should("be.visible").and(($iframe) => {
            // Validate iframe is not empty and contains game-specific content
            const src = $iframe.attr('src');
            expect(src).to.include('bookofdeadmobile');
        });

        //Validating if the canvas is visible
        cy.get(this.gameFrame)
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap)
            .find('canvas')
            .should('be.visible');

        //TODO: Need to search for better assertions for validating the loading of the game
    }
}

export default GameHomePage;
