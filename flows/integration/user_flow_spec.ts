import {NewUser} from '../../src/components/user/store/types';

describe('a user signing up', () => {
  describe('with valid user information', () => {
    before(() => {
      cy.server();
      cy.signup(user, {
        post: {status: 201, response: {name: user.name, id: 'id'}},
        get: {
          status: 200, response: {
            content: [
              {name: 'Devon', id: 'other-id'},
              {name: 'David', id: 'other-id'},
              {name: 'Frances', id: 'other-id'},
              {name: 'Andrew', id: 'other-id'},
              {name: 'Caren', id: 'other-id'}
            ],
            last: true,
            first: true,
            empty: false,
            size: 1,
            totalElements: 5,
            number: 0,
            sort: {},
            totalPages: 1,
            numberOfElements: 10,
            pageable: {}
          }
        }
      });
    });

    it('should show the new user', () => {
      cy.get('#current-user .name').should('contain', user.name);
    });

    it('should show the other users', () => {
      cy.get('.other-users li').should('have.length', 5);
    });
  });

  describe('with invalid user information', () => {
    before(() => {
      cy.server();
      cy.signup(user, {
        post: {
          status: 400,
          response: {username: {value: user.name, validations: ['USERNAME_EXISTS']}}
        }
      });
    });

    it('should not allow creation of a pre-existing user', () => {
      cy.get('.text-input.username').should('have.class', 'invalid');
    });

    it('should not show the name as the current user', () => {
      cy.get('#current-user .name').should('not.exist');
    });
  });
});

const user: NewUser = {
  name: 'Benedict Cumberbatch'
};
