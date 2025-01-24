import * as vars from '../variables/login'
import * as data from '../fixtures/credentials.json'

Cypress.Commands.add('login', ()=> {
    cy.visit(Cypress.config('baseUrl'))
    
    cy.get(vars.field_username).should('be.visible').type(data.username)
    cy.get(vars.field_password).should('be.visible').type(data.password)
    cy.get(vars.btn_login).should('be.enabled').click()

    cy.wait(3500)
    cy.contains("Dashboard").should('be.visible')
})