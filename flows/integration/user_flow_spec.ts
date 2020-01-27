import {NewUser} from '../../src/app/store/user/types';

describe('a user signing up', () => {
  it('should be on the authorization page', () => {
    cy.visit('/');
    cy.location().should(({pathname}) => {
      expect(pathname).to.eq('/authorization');
    });
  });

  describe('when logged in', () => {
    before(() => {
      cy.server();
      cy.signup(user, {
        post: {status: 201, response: {name: user.name, id: 'id', status: 'AVAILABLE'}}
      });
    });

    it('should show the new user', () => {
      cy.get('#current-user-info .name').should('exist');
    });

    it('should be on the home page', () => {
      cy.location().should(({pathname}) => {
        expect(pathname).to.eq('/');
      });
    });

    describe('when logging out', () => {
      it('should be back on the signup page', () => {
        cy.contains('Logout').click();
        cy.location().should(({pathname}) => {
          expect(pathname).to.eq('/authorization');
        });
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
        },
        get: {}
      });
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
  name: 'Benedict Cumberbatch',
  password: 'Bandicoot Cabbagepatch'
};
