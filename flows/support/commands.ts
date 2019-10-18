import deferred from './fake/deferred';
import {NewUser} from '../../src/components/user/store/types';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      signup(name: NewUser, id?: string): Chainable<Subject>;

      signupClientError(name: NewUser, id?: string): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('signup', ({name}: NewUser, id = '1') => {
  deferred.resolve({
    json: () => ({name, id}),
    status: 201
  });
  return cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(win, 'fetch')
        .withArgs('http://localhost:3001/users')
        .returns(deferred.promise);
    }
  })
    .get('#create-user .username input')
    .type(name)
    .get('form')
    .submit();
});

Cypress.Commands.add('signupClientError', ({name}: NewUser, ...errors: string[]) => {
  deferred.resolve({
    json: () => ({username: name, errors}),
    status: 400
  });
  return cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(win, 'fetch')
        .withArgs('http://localhost:3001/users')
        .returns(deferred.promise);
    }
  })
    .get('#create-user .username input')
    .type(name)
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
