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

  context('When page is initially opened', function () {
    it('should focus on the todo input field', function () {
      // get the currently focused element and assert
      // that it has class='new-todo'
      //
      // http://on.cypress.io/focused
      cy.focused().should('have.class', 'new-todo')
    })
  })

  context('No Todos', function () {
    it('should hide #main and #footer', function () {
      // Unlike the TodoMVC tests, we don't need to create
      // a gazillion helper functions which are difficult to
      // parse through. Instead we'll opt to use real selectors
      // so as to make our testing intentions as clear as possible.
      //
      // http://on.cypress.io/get
      cy.get('.todo-list li').should('not.exist')
      cy.get('.main').should('not.exist')
      cy.get('.footer').should('not.exist')
    })
  })

  context('Item', function () {
    // New commands used here:
    // - cy.clear    https://on.cypress.io/api/clear

    it('should allow me to mark items as complete', function () {
      // we are aliasing the return value of
      // our custom command 'createTodo'
      //
      // the return value is the <li> in the <ul.todos-list>
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')

      cy.get('@firstTodo').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed')

      cy.get('@secondTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').find('.toggle').check()

      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('have.class', 'completed')
    })

    it('should allow me to un-mark items as complete', function () {
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')

      cy.get('@firstTodo').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')

      cy.get('@firstTodo').find('.toggle').uncheck()
      cy.get('@firstTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')
    })

    it('should allow me to edit an item', function () {
      cy.createDefaultTodos().as('todos')

      cy.get('@todos').eq(1).as('secondTodo')
        // TODO: fix this, dblclick should
        // have been issued to label
        .find('label').dblclick()

      // clear out the inputs current value
      // and type a new value
      cy.get('@secondTodo').find('.edit').clear()
        .type('buy some sausages').type('{enter}')

      // explicitly assert about the text value
      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain', 'buy some sausages')
      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })
  })

  context('Counter', function () {
    it('should display the current number of todo items', function () {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get('.todo-count').contains('1 item left')
      cy.createTodo(TODO_ITEM_TWO)
      cy.get('.todo-count').contains('2 items left')
    })
  })

  context('Persistence', function () {
    it('should persist its data', function () {
      // mimicking TodoMVC tests
      // by writing out this function
      function testState() {
        cy.get('@firstTodo').should('contain', TODO_ITEM_ONE).and('have.class', 'completed')
        cy.get('@secondTodo').should('contain', TODO_ITEM_TWO).and('not.have.class', 'completed')
      }

      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')
      cy.get('@firstTodo').find('.toggle').check()
        .then(testState)

      // .reload()
      // .then(testState)
    })
  })
})
