import {NewUser} from '../../src/components/user/store/types';

describe('a user signing up', () => {
  describe('with valid user information', () => {
    before(() => {
      cy.server();
      cy.signup(user, {
        post: {status: 201, response: {name: user.name, id: 'id'}},
        get: {status: 200, response: [{name: 'Devon', id: 'other-id'}]}
      });
    });

    it('should show the new user', () => {
      cy.get('#current-user .name').should('contain', user.name);
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
