import {NewUser} from '../../src/app/store/user/types';
import {has} from '../../src/lib/util/helpers';

interface ResponseSetup {
  status?: Number;
  response?: Object;
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
const defaultGet = {
  status: 200, response: {
    content: [
      {name: 'Devon', id: 'other-id-0', status: 'AVAILABLE'},
      {name: 'David', id: 'other-id-1', status: 'AVAILABLE'},
      {name: 'Frances', id: 'other-id-2', status: 'AVAILABLE'},
      {name: 'Andrew', id: 'other-id-3', status: 'AVAILABLE'},
      {name: 'Caren', id: 'other-id-4', status: 'AVAILABLE'}
    ],
    last: true,
    first: true,
    empty: false,
    size: 1,
    totalElements: 5,
    number: 0,
    totalPages: 1,
    numberOfElements: 10
  }
};

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

    if (has(get)) {
      cy.route({
        method: 'GET',
        url: '**/users?exclude=*',
        status: get.status,
        response: get.response
      }).as('getOtherUsers');
    }

    cy.visit('/', config)
      .get('form')
      .within(() => {
        cy.get('#username')
          .type(user.name)
          .root().submit();
      })
      .wait('@createUser');

    if (has(get)) {
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
