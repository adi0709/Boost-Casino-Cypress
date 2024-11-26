class BookOfDeadGamePage {
    constructor() {
        this.gameFrame = "[id='ax-game-iframe']"
    }

    // Method to verify the game is loading
    verifyGameLoading() {

        //Validating the correct Url is reached
        cy.url().should("include", "slots/book-of-dead");

        //Checking for the iFrame to be visible and have specific values
        cy.get(this.gameFrame).should("be.visible").and(($iframe) => {
            // Validate iframe is not empty and contains game-specific content
            const src = $iframe.attr('src');
            expect(src).to.include('bookofdead');
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

export default BookOfDeadGamePage;