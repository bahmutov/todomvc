/// <reference types="cypress" />

// ***********************************************
// All of these tests are written to implement
// the official TodoMVC tests written for Selenium.
//
// The Cypress tests cover the exact same functionality,
// and match the same test names as TodoMVC.
// Please read our getting started guide
// https://on.cypress.io/introduction-to-cypress
//
// You can find the original TodoMVC tests here:
// https://github.com/tastejs/todomvc/blob/master/tests/test.js
// ***********************************************

describe('TodoMVC - React', function () {

  // setup these constants to match what TodoMVC does
  let TODO_ITEM_ONE = 'buy some cheese'
  let TODO_ITEM_TWO = 'feed the cat'
  let TODO_ITEM_THREE = 'book a doctors appointment'

  beforeEach(function () {
    // By default Cypress will automatically
    // clear the Local Storage prior to each
    // test which ensures no todos carry over
    // between tests.
    //
    // Go out and visit our local web server
    // before each test, which serves us the
    // TodoMVC App we want to test against
    //
    // We've set our baseUrl to be http://localhost:8888
    // which is automatically prepended to cy.visit
    //
    // https://on.cypress.io/api/visit
    cy.visit('/')
  })

  context('Routing', function () {
    // New commands used here:
    // https://on.cypress.io/window
    // https://on.cypress.io/its
    // https://on.cypress.io/invoke
    // https://on.cypress.io/within

    beforeEach(function () {
      cy.createDefaultTodos().as('todos')
    })

    it('should allow me to display active items', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.filters').contains('Active').click()
      cy.get('@todos').should('have.length', 2)
    })

    it('should respect the back button', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.filters').contains('Active').click()
      cy.get('.filters').contains('Completed').click()
      // cy.get('@todos').should('have.length', 1)
      // cy.go('back')
      // cy.get('@todos').should('have.length', 2)
      // cy.go('back')
      // cy.get('@todos').should('have.length', 3)
    })

    it('should allow me to display completed items', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.filters').contains('Completed').click()
      cy.get('@todos').should('have.length', 1)
    })

    it('should allow me to display all items', function () {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.filters').contains('Active').click()
      cy.get('.filters').contains('Completed').click()
      cy.get('.filters').contains('All').click()
      // cy.get('@todos').should('have.length', 3)
    })

    it('should highlight the currently applied filter', function () {
      // using a within here which will automatically scope
      // nested 'cy' queries to our parent element <ul.filters>
      cy.get('.filters').within(function () {
        cy.contains('All').should('have.class', 'selected')
        cy.contains('Active').click().should('have.class', 'selected')
        cy.contains('Completed').click().should('have.class', 'selected')
      })
    })
  })
})
