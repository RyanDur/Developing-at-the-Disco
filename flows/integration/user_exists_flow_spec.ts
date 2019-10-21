import {NewUser} from '../../src/components/user/store/types';
import {clientError} from '../support';

const user: NewUser = {
  name: 'Benedict Cumberbatch'
};

describe('signing up as a pre-existing user', () => {
  it('should not allow it', () => {
    const signup = cy.signup(user, clientError(user, cy));
    signup.get('#current-user .name').should('not.exist');
    signup.get('.text-input.username').should('have.class', 'invalid');
  });
});
