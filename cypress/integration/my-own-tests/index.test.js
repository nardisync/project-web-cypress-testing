/// <reference types= "cypress" />

const app = '..\\..\\..\\index.html'

describe('Test Suit: Simple Form', () =>{
    
    beforeEach(() => cy.visit(app))

    it('Test Case: All the forms are visible', () => {

        cy.get('input#form-name').should('exist')
        cy.get('input#form-surname').should('exist')
        cy.get('input#form-email').should('exist')
        cy.get('input#form-age').should('exist')
        cy.get('#sex-form-Male').should('exist')
        cy.get('#sex-form-Fermale').should('exist')
        cy.get('#sex-form-Not').should('exist')
        cy.get('button#submit-button').should('exist')
        cy.get('p#submit-feedback').should('exist')
    }) 

    it('Test Case: Validating First Name field', () => {
        cy.get('input#form-name').type('Marco')
        cy.get('input#form-surname').click()

        cy.get('input#form-name').should('have.value', 'Marco')
    })

    it('Test Case: Validating Surname field', () => {
        cy.get('input#form-surname').type('Nardi')
        cy.get('input#form-name').click()

        cy.get('input#form-surname').should('have.value', 'Nardi')
    })

    it('Test Case: Validating Email field', () => {
        cy.get('input#form-email').type('emaildiprova@random.com')
        cy.get('input#form-surname').click()

        cy.get('input#form-email').should('have.value', 'emaildiprova@random.com')
    })

    it('Test Case: Validating Right Age field', () => {
        cy.get('input#form-age').type('33')
        cy.get('input#form-surname').click()

        cy.get('input#form-age').should('have.value', '33')
    })

    it('Test Case: Validating Wrong Age field with Alert', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.contains('You must be at least 18 for apply for this job!')
        });

        cy.get('input#form-age').type('15')
        cy.get('input#form-surname').click()

        cy.get('input#form-age').should('have.value', '')
    })
    
    it('Test Case: Select Submit with empty form', () => {
        cy.get('button#submit-button').click()

        cy.get('p#submit-feedback').should('have.text', 'Fullfil all the forms')
    })
    
    it('Test Case: Select Submit with some value selected on the form', () => {
        cy.get('input#form-name').type('Marco')
        cy.get('input#form-surname').type('Nardi')
        cy.get('#sex-form-Male').check()

        cy.get('button#submit-button').click()

        cy.get('p#submit-feedback').should('have.text', 'Fullfil all the forms')
    })

    it('Test Case: Select Submit with full form', () => {
        cy.get('input#form-name').type('Marco')
        cy.get('input#form-surname').type('Nardi')
        cy.get('input#form-email').type('emaildiprova@random.com')
        cy.get('input#form-age').type('33')
        cy.get('#sex-form-Male').check()

        cy.get('button#submit-button').click()

        cy.get('p#submit-feedback').should('have.text', "Your name is Marco Nardi.A male of 33 years. The email that you insert is : 'emaildiprova@random.com'.")
    })

})


describe('Test Suit: Snapshots', () =>{
    
    beforeEach(() => cy.visit(app))

    it('Test Case: Check Full Page UI with Snapshot', () => {
        cy.get(".maindiv").then( compiledForm => {
            cy.document().toMatchImageSnapshot()
        })
    })

    it('Test Case: Check Form UI with Snapshot BEFORE writting', () => {
        cy.get('input#form-name').type('Marco')
        cy.get('input#form-surname').type('Nardi')
        cy.get('input#form-email').type('emaildiprova@random.com')
        cy.get('input#form-age').type('33')
        cy.get('#sex-form-Male').check()
        cy.get(".maindiv").then( compiledForm => {
            cy.wrap(compiledForm).toMatchImageSnapshot()
        })
    })

    it('Test Case: Check Form UI with Snapshot AFTER writting', () => {
        cy.get('input#form-name').type('Marco')
        cy.get('input#form-surname').type('Nardi')
        cy.get('input#form-email').type('emaildiprova@random.com')
        cy.get('input#form-age').type('33')
        cy.get('#sex-form-Male').check()
        cy.get('button#submit-button').click()
        cy.get(".maindiv").then( compiledForm => {
            cy.wrap(compiledForm).toMatchImageSnapshot()
        })
    })

})