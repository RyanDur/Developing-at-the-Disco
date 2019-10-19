import {NewUser} from '../../src/components/user/store/types';
import deferred from '../support/fake/deferred';

const user: NewUser = {
  name: 'Benedict Cumberbatch'
};

const clientError = {
  onBeforeLoad(win: Window) {
    deferred.resolve({
      json: () => ({username: {value: user.name, validations: ['USERNAME_EXISTS']}}),
      status: 400
    });
    cy.stub(win, 'fetch')
      .withArgs('http://localhost:3001/users')
      .returns(deferred.promise);
  }
};

describe('signing up pre-existing user', () => {
  it('should not allow a username that already exists', () => {
    const signup = cy.visit('/', clientError)
      .get('#create-user .username input')
      .type(user.name)
      .get('form')
      .submit();
    signup.get('#current-user .name').should('not.exist');
    signup.get('.text-input.username').should('have.class', 'invalid');
  });
});
