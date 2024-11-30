class CustomerPage {

    //Validate if the customer support is opened
    validateCustomerSupportPageAccessed(customerSupportPage) {

        //Validating the url is correct
        cy.url().should("eq", `${Cypress.config().baseUrl}${customerSupportPage}`, "Validate the new URL is correct for customer support")

        //Validating the H1 title has the correct text
        //Using Contains since data-cy tag is not attached to any element
        cy.contains("Hello. What can we help you with?").should("be.visible", "Validating the page has the following text on it")
    }
}

export default CustomerPage;