/// <reference types="cypress" />

describe('Suite A', () => {
  it('works 1', () => {})
  it('works 2', () => {
    // make this test fail
    cy.wrap(42).should('equal', 43)
  })
  it('works 3', () => {
    // make this test fail too
    cy.wrap('hello').should('equal', 'bye')
  })
})
