import * as vars from '../variables/login'
const url = Cypress.config('baseUrl')

describe('Login', () => {
    const url = Cypress.config('baseUrl')
  
    beforeEach(() => {
      cy.visit(url)
    })
  
    it('should display the login page and allow user to log in', () => {
      cy.contains("Please log in first to access the application").should('be.visible')
  
      cy.get(vars.field_username).should('be.visible').type("green")
      cy.get(vars.field_password).should('be.visible').type("Password!123")
      cy.get(vars.btn_login).should('be.enabled').click()

      cy.contains("Dashboard").should('be.visible')
    })
})