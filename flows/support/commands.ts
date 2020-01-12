import {NewUser} from '../../src/app/store/user/types';

interface ResponseSetup {
  status: Number;
  response: Object;
}

interface Setup {
  post?: ResponseSetup;
  get?: ResponseSetup;
}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      signup: (user: NewUser, setup: Setup, config?: Object) => Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('signup', (user, setup, config) => {
  cy.route({
    method: 'POST',
    url: '**/users',
    status: setup.post.status,
    response: setup.post.response
  }).as('createUser');

  if (setup.get) {
    cy.route({
      method: 'GET',
      url: '**/users?exclude=*',
      status: setup.get.status,
      response: setup.get.response
    }).as('getOtherUsers');
  }

  cy.visit('/', config)
    .get('#create-user .username input')
    .type(user.name)
    .get('form')
    .submit()
    .wait('@createUser');

  if (setup.get) {
    cy.wait('@getOtherUsers');
  }
});

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
// Cypress.Commands.add("login", (email, password) => { ... })
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
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
