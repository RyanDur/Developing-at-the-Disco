import {NewUser} from '../../src/components/user/store/types';
import deferred from '../support/fake/deferred';

const user: NewUser = {
  name: 'Benedict Cumberbatch'
};

describe('signing up pre-existing user', () => {
  it('should not allow a username that already exists', () => {
    deferred.resolve({
      json: () => ({username: {value: user.name, validations: ['USERNAME_EXISTS']}}),
      status: 400
    });
    const signupClientError = cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs('http://localhost:3001/users')
          .returns(deferred.promise);
      }
    })
      .get('#create-user .username input')
      .type(user.name)
      .get('form')
      .submit();
    signupClientError.get('#current-user .name').should('not.contain', user.name);
    signupClientError.get('.text-input.username').should('have.class', 'invalid');
  });
});
