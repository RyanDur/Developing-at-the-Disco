import {NewUser} from '../../src/components/user/store/types';
import deferred from '../support/fake/deferred';

describe('a user', () => {
  const user: NewUser = {
    name: 'Benedict Cumberbatch'
  };

  describe('signing up', () => {
    it('should have to create a user', () => {
      deferred.resolve({
        json: () => ({name: user.name, id: 'id'}),
        status: 201
      });
      const submit = cy.visit('/', {
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

      submit.get('#current-user .name').should('contain', user.name);
    });
  });
});
