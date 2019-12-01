import {NewUser} from '../../src/components/user/store/types';

describe('a user signing up', () => {
  it('should be on the authorization page', () => {
    cy.visit('/');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/authorization');
    });
  });

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
            totalPages: 1,
            numberOfElements: 10
          }
        }
      });
    });

    it('should show the new user', () => {
      cy.get('#current-user-info .name').should('contain', user.name);
    });

    it('should be on the home page', () => {
      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/');
      });
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
      cy.get('#current-user-info .name').should('not.exist');
    });

    it('should be on the authorization page', () => {
      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/authorization');
      });
    });
  });
});

const user: NewUser = {
  name: 'Benedict Cumberbatch'
};
