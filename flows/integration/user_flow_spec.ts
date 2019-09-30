import {NewUser} from '../../src/components/user/store/types';

describe('a user', () => {
  const user: NewUser = {
    name: 'Benedict Cumberbatch'
  };

  describe('visiting the site', () => {
    describe('for the first time', () => {
      it('should have to create a user name', () => {
        cy.signup(user).get('#current-user .name').should('contain', user.name);
      });
    });
  });
});
