class NavigationPages {
    constructor() {
        this.mobileNavigationBurger = ".af-header-mobile-menu-trigger"
        this.navMenu = "[data-af='nav']"
        this.navItems = "li"
        this.subNav = "[data-af='sub-nav']"
    }

    //Getting the navigation burger and validating its visibility
    validateNavigationBurger() {
        cy.intercept({
            method: "GET",
            url: "/api/casino/games?category**",
        }).as("menuImage")

        cy.get(this.mobileNavigationBurger)
            .should("be.visible", "Validating the navigation menu menu menu is visible")
            .click();

        cy.wait("@menuImage", {timeout: 10000})
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
                                expect(text.trim()).to.include(navItem[index], "Validating the text is the same as we expect from gherkin examples");
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


    //Validate Casino Navigation Items
    validateCasinoNavItem(navItem) {

        cy.get(this.subNav).within(() => {
            cy.get(this.navItems)
                .each(($el, index) => {
                    cy.wrap($el)
                        .invoke("text")
                        .then((text) => {
                            expect(text.trim()).to.eq(navItem[index], `Validate if the ${index + 1} item in the subNav is ${navItem[index]}`);
                        })
                })
        })
    }
}

export default NavigationPages;