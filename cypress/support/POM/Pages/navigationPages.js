class NavigationPages {
    constructor() {
        this.mobileNavigationBurger = ".af-header-mobile-menu-trigger"
        this.navMenu = "[data-af='nav']"
        this.navItems = "ul li"
    }

    //Getting the navigation burger and validating its visibility
    validateNavigationBurger() {
        cy.intercept({
            method: "GET",
            url: "/api/casino/games?category**",
        }).as("menuImage")

        cy.get(this.mobileNavigationBurger)
            .should("be.visible")
            .click();

        cy.wait("@menuImage")
    }

    //Validating the navigation menu
    validateNavigationItems(navItem) {

        //Validating the navigation is opened and is visible
        cy.get(this.navMenu)
            .first()
            .should("be.visible")


        //Getting navigation bar
        cy.get(this.navMenu)
            .first()
            //Getting all the elements inside the navigation bar
            .within(() => {

                //Accessing the navigation items since they follow the ul and li
                cy.get(this.navItems)
                    //Accessing each nav item
                    .each(($el, index) => {
                        //Wrapping so that actions can be made on it
                        cy.wrap($el)
                            //Invoking the text
                            .invoke("text")
                            .then((text) => {
                                //Making the assertion on the text with the navItems we will get from gherkin examples
                                expect(text).to.include(navItem[index]);
                            })
                    })
            })

    }

    //Open Customer support navigation tab
    selectCustomerSupportNavItem(customerNavItem) {
        cy.get(this.navMenu)
            .first()
            .within(() => {
                cy.contains(customerNavItem).click();
            })
    }


    //select Casino navigation tab
    selectCasinoNavItem(casinoNavItem) {
        cy.get(this.navMenu)
            .first()
            .within(() => {
                cy.contains(casinoNavItem).click();
            })
    }

    //TODO: Need to add more assertions to this block
    //Validate Casino Navigation Items
    validateCasinoNavItem(navItem) {

    }
}

export default NavigationPages;