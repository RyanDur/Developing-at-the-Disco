import deferred from './deferred';
import {NewUser} from '../../../src/components/user/store/types/user';
import {initServer} from './server';

export const success = (user: NewUser, page: Cypress.cy) => ({
  onBeforeLoad(win: Window) {
    deferred.resolve({
      json: () => ({name: user.name, id: 'id'}),
      status: 201
    });
    initServer();
    page.stub(win, 'fetch')
      .withArgs('http://localhost:3001/users')
      .returns(deferred.promise);
  }
});
