/// <reference types="Cypress" />
const faker = require('faker');
let userData = {
    email: "labinot@labinot.com",
    password: "poviolabs",
    randomName: faker.name.findName(),
    randomText: faker.random.words()

}
beforeEach(() => {
    cy.visit('/users/sign_in')
    cy.login(userData.email, userData.password)
});

describe('Creating campaing as logged in user ', () => {
    it('Can create a campaing', () => {
        cy.get(".navbar-nav>li:nth-child(2)").click()
        cy.get('a[href="/campaigns/new"]').click()
        cy.fillCampaignForm(userData.randomName, userData.randomText)
        cy.get("#flash_notice").should('have.text', 'Campaign was successfully created.')
    });

    it('Can edit existing campaing', () => {
        cy.visit('/campaigns')
        cy.get('tr > :nth-child(3) > a').click()
        cy.fillCampaignForm("Edit" + userData.randomName, "Edit" + userData.randomText)
        cy.get("#flash_notice").should('have.text', 'Campaign was successfully updated.')
    });

    it('Can destroy campaign', () => {
        cy.visit('/campaigns')
        cy.get(":nth-child(1) > :nth-child(4) > a").click()
        cy.get("#flash_notice").should('have.text', 'Campaign was successfully destroyed.')
    });
});