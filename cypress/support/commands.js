import '@testing-library/cypress/add-commands';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
    cy.get('input[name="user[email]"]').type(email)
    cy.get('input[name="user[password]"]').type(password)
    cy.get('.button.right').click()
    cy.get("#flash_notice").should('have.text', "Signed in successfully.")
})

Cypress.Commands.add("fillCampaignForm", (name, description) => {
    cy.get("input[name='campaign[name]'").type(name)
    cy.get("input[name='campaign[description]'").type(description)
    cy.get(".button").click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
