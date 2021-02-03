/// <reference types="Cypress" />
beforeEach(() => {
    cy.visit('/')
})

describe('The health check for povioLabs', () => {
    it('Can access the page', () => {
        cy.request({
            //faildOnStatusCode:false allows for the request to fail since cypress does not have .catch method
            method: "GET", url: "/", failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Can access navBar elements', () => {
        cy.get(".navbar-collapse").children().should('have.length', 1)
        cy.get(".navbar-nav").children().should('have.length', 2)
    });

    it('Clicking navBar elements redirects user to a new page', () => {
        cy.get(".navbar-nav>li:nth-child(1)").click()
        cy.url().should("include", "/users/sign_in")
        cy.get(".navbar-nav>li:nth-child(2)").click()
        cy.url().should("include", "/users/sign_up")
    });

    it('Can logout', () => {
        cy.visit("/users/sign_in")
        cy.login("222@222.com", "123456")
        cy.get(".navbar-nav>li:nth-child(3)").click()
        cy.get("#flash_notice").should('have.text', "Signed out successfully.")
    });

});
