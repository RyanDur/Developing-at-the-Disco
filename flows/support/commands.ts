import {NewUser} from '../../src/components/user/store/types';

interface Config {
  status: Number;
  response: Object;
  config?: Object;
}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      signup: (user: NewUser, config: Config) => Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('signup', (user, {status, response, config}) => {
  return cy.route({
    method: 'POST',
    url: '**/users',
    status,
    response
  }).as('apiCall')
    .visit('/', config)
    .get('#create-user .username input')
    .type(user.name)
    .get('form')
    .submit()
    .wait('@apiCall');
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
