import {NewUser} from '../../src/components/user/store/types';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      signup: (user: NewUser, config: Object) => Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('signup', (user, config) => {
  return cy.visit('/', config)
    .get('#create-user .username input')
    .type(user.name)
    .get('form')
    .submit();
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
