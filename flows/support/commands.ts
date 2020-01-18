import {NewUser} from '../../src/app/store/user/types';
import {has} from '../../src/lib/util/helpers';

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
      logout: (setup: Setup, config?: Object) => Chainable<Subject>;
    }
  }
}

const defaultPost = {status: 201, response: ''};
const defaultGet = {status: 200, response: ''};

Cypress.Commands.add('signup',
  (user,
   {
     post = defaultPost,
     get = defaultGet
   },
   config) => {
    cy.route({
      method: 'POST',
      url: '**/users',
      status: post.status,
      response: post.response
    }).as('createUser');

    cy.route({
      method: 'GET',
      url: '**/users?exclude=*',
      status: get.status,
      response: get.response
    }).as('getOtherUsers');

    cy.visit('/', config)
      .get('form')
      .within(() => {
        cy.get('.username input')
          .type(user.name)
          .root().submit();
      })
      .wait('@createUser');

    if (has(get.response)) {
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
