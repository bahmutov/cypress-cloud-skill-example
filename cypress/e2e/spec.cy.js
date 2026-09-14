/// <reference types="cypress" />

describe('Suite A', () => {
  it('works 1', () => {})
  it('works 2', () => {
    // make this test fail
    throw new Error('This test is supposed to fail')
  })
  it('works 3', () => {
    // make this test fail too
    throw new Error('This test is supposed to fail too')
  })
})
