import deferred from './deferred';
import {NewUser} from '../../../src/components/user/store/types/user';

export const clientError = (user: NewUser, page: Cypress.cy) => ({
  onBeforeLoad(win: Window) {
    deferred.resolve({
      json: () => ({username: {value: user.name, validations: ['USERNAME_EXISTS']}}),
      status: 400
    });
    page.stub(win, 'fetch')
      .withArgs('http://localhost:3001/users')
      .returns(deferred.promise);
  }
});
