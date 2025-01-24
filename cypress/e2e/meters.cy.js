import * as side from '../variables/sidebar'
import * as mt from '../variables/meters'
import 'cypress-xpath'

describe('Meter and Group Scenarios', () => {

    let meterData
    let randomMeterName
    let randomMeterDescription

    before(() => {
        cy.fixture('meters').then((data) => {
            meterData = data
        })
    })

    beforeEach(() => {
      cy.login()
      cy.get(side.menu_assets).click()
      cy.get(side.submenu_meters_groups).should('be.visible').click()
    //   cy.get(mt.btn_choose_action).click()
    })

    it('should display Meters and Groups page correctly', () => {
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/page/assets/meters-&-groups`)
    })

    const createMeter = (meterName, meterDescription, isExisting) => {
        cy.get(mt.btn_new_meter).should('be.visible').click()
    
        cy.get(mt.field_meter_name).should('be.visible').type(meterName)
        cy.get(mt.field_description).type(meterDescription)
    
        cy.get(mt.option_type).should('be.visible').click({ force: true })
        cy.wait(500)
        cy.get(mt.field_option_type)
            .should('be.visible')
            .type(`${meterData.meter_type[1]}{enter}`, { force: true })
    
        cy.get(mt.option_reading_type).should('be.visible').click({ force: true })
        cy.wait(1000)
        cy.get(mt.field_option_reading_type)
            .should('be.visible')
            .type(`${meterData.reading_type[1]}`, { force: true })
        cy.wait(2000)
        cy.get(mt.field_option_reading_type).type('{enter}', { force: true })
    
        cy.get(mt.option_uom).should('be.visible').click({ force: true })
        cy.wait(500)
        cy.get(mt.field_option_uom)
            .should('be.visible')
            .type(`${meterData.uom[7]}`, { force: true })
        cy.wait(2000)
        cy.get(mt.field_option_uom).type('{enter}', { force: true })
    
        cy.get(mt.btn_submit).click()
        cy.wait(1000)
    
        cy.get(mt.btn_yes_confirm).click()
        cy.wait(1000)
    
        cy.get('body').then(($body) => {
            if ($body.text().includes("Meter added successfully.")) {
                if (isExisting) {
                    throw new Error('Test failed: Existing meter was added successfully.')
                }
                cy.contains("Meter added successfully.")
                    .should('be.visible')
                    .then(() => {
                        cy.get(mt.btn_ok_confirm).click()
                    })
            } else if ($body.text().includes("resource already exists")) {
                if (!isExisting) {
                    throw new Error('Test failed: Random meter already exists.')
                }
                cy.contains("resource already exists")
                    .should('be.visible')
                    .then(() => {
                        cy.get(mt.btn_ok_confirm).click()
                    })
            } else {
                throw new Error('Unexpected message: Neither success nor failure message appeared.')
            }
        })
    }
    
    describe('Create New Meter Tests', () => {
        it('Create New Meter - Normal Flow (Existing)', () => {
            cy.get(mt.btn_choose_action).click()
            createMeter(meterData.meter_name, meterData.meter_description, true)
        })
    
        it('Create New Meter - Normal Flow (Random)', () => {
            cy.get(mt.btn_choose_action).click()
    
            const timestamp = Date.now()
            randomMeterName = `meter-${timestamp}`
            randomMeterDescription = `description-${timestamp}`
    
            createMeter(randomMeterName, randomMeterDescription, false)
        })

        it('Makesure the data created', () => {
            cy.get('input[placeholder="Search"]').eq(2).should('be.visible').type(randomMeterName + '{enter}', { force: true })

            cy.get('tbody tr')
                .contains(randomMeterName)
                .should('be.visible')
        })

        it('Update the data created', () => {
            cy.get('input[placeholder="Search"]').eq(2).should('be.visible').type(randomMeterName + '{enter}', { force: true })

            cy.get('tbody tr')
                .contains(randomMeterName)
                .should('be.visible')
                .click()

            cy.get(mt.btn_choose_action).click()
            cy.get(mt.btn_edit_meter).should('be.visible').click()

            cy.get(mt.field_meter_name).should('be.visible').clear().type(randomMeterName + ' - Updated')
            cy.get(mt.field_description).clear().type(randomMeterDescription + ' - Updated')
            
            cy.get(mt.btn_submit).click()
            cy.wait(1000)

            cy.get(mt.btn_yes_confirm).click()
            cy.wait(1000)

            cy.contains("Meter updated successfully.")
                .should('be.visible')
                .then(() => {
                    cy.get(mt.btn_ok_confirm).click()
                })

            cy.wait(1000)

            cy.get("div[class='container-fluid']").eq(2)
                .contains(randomMeterName + ' - Updated')
                .should('be.visible')
        })

        it('Delete Meter', () => {
            const updatedMeterName = randomMeterName + ' - Updated'
            
            cy.get(mt.btn_choose_action).click()
            cy.get(mt.btn_delete_meter)
                .should('be.visible')
                .click()
                .then(() => {
                    cy.get('h5.modal-title')
                        .contains('Delete Meter')
                        .should('be.visible')
                })
        
            cy.wait(500)
        
            cy.get('input[role="combobox"][type="text"]')
                .should('be.visible')
                .type(updatedMeterName)
                .wait(2000)
        
            cy.get('input[role="combobox"][type="text"]')
                .should('be.visible')
                .type('{enter}')
                .wait(2000)
        
            cy.get('.modal-content')
                .find('div')
                .should('contain.text', updatedMeterName)
                .then(() => {
                    cy.get("button:contains('Delete')") 
                        .should('be.visible')
                        .eq(1)
                        .click({ force: true })
            })
        
            cy.wait(500)
            cy.get(mt.btn_yes_confirm).should('be.visible').click().wait(1000)
        
            cy.get('body').then(($body) => {
                if ($body.text().includes("Meter deleted successfully.")) {
                    cy.contains("Meter deleted successfully.")
                        .should('be.visible')
                        .then(() => {
                            cy.get(mt.btn_ok_confirm).click()
                        })
                } else if ($body.text().includes("Meter is used, can not be deleted.")) {
                    throw new Error('Test failed: Meter is used and cannot be deleted.')
                } else {
                    throw new Error('Unexpected message: Neither success nor failure message appeared.')
                }
            })
        })
    })
})