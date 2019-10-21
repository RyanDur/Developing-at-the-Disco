import {NewUser} from '../../src/components/user/store/types';
import {success} from '../support';

describe('a user', () => {
  describe('signing up', () => {
    it('should show the new user', () => {
      cy.signup(user, success(user, cy))
      .get('#current-user .name').should('contain', user.name);
    });

    it('should show the other users', () => {
      cy.signup(user, success(user, cy))
        .get('.other-users .user').should('have.length', 2);
    });

  });
});

const user: NewUser = {
  name: 'Benedict Cumberbatch'
};
