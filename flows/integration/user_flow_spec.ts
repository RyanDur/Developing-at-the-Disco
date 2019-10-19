import {NewUser} from '../../src/components/user/store/types';
import deferred from '../support/fake/deferred';

describe('a user', () => {
  describe('signing up', () => {
    it('should have to create a user', () => {
      const submit = cy.visit('/', success)
        .get('#create-user .username input')
        .type(user.name)
        .get('form')
        .submit();

      submit.get('#current-user .name').should('contain', user.name);
    });
  });
});

const user: NewUser = {
  name: 'Benedict Cumberbatch'
};

const success = {
  onBeforeLoad(win: Window) {
    deferred.resolve({
      json: () => ({name: user.name, id: 'id'}),
      status: 201
    });
    cy.stub(win, 'fetch')
      .withArgs('http://localhost:3001/users')
      .returns(deferred.promise);
  }
};
