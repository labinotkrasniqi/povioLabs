/// <reference types="Cypress" />
const faker = require('faker');

let userData = {
    randomName: faker.name.findName(),
    randomEmail: faker.internet.email(),
    randomPassword: faker.random.number()
}

beforeEach(() => {
    cy.visit("/users/sign_up")
});

describe('User SignUp', () => {
    it('Can signup with a new valid user', () => {
        cy.get('input[name="user[name]"]').type(userData.randomName)
        cy.get('input[name="user[email]"]').type(userData.randomEmail)
        cy.get('input[name="user[password]"]').type("123" + userData.randomPassword)
        cy.get('input[name="user[password_confirmation]"]').type("123" + userData.randomPassword)
        cy.get('.button.right').click()
        cy.get("#flash_notice").should('have.text', "Welcome! You have signed up successfully.")
    });

    it("Can't signUp with existing email", () => {
        cy.get('input[name="user[name]"]').type(userData.randomName)
        cy.get('input[name="user[email]"]').type("222@222.com")
        cy.get('input[name="user[password]"]').type("123" + userData.randomPassword)
        cy.get('input[name="user[password_confirmation]"]').type("123" + userData.randomPassword)
        cy.get('.button.right').click()
        cy.get("#error_explanation").should('contain', "Email has already been taken")
    });
});