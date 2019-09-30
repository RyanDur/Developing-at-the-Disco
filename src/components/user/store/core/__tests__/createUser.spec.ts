import {create} from '../createUser';
import {CurrentUser} from '../../types';
import {endpoint} from '../../../../../config';
const fetchMock = require('fetch-mock');

describe('creating a user', () => {
  const currentUser = {name: 'Ryan', id: 1};
  const mock = jest.fn();

  beforeEach(() => {
    endpoint.users = 'http://some-host/users';
    fetchMock.post('path:/users', currentUser);
  });

  it('should handle the response of creating a user', (done) => {
    create({name: 'Ryan'}, (user: CurrentUser) => {
      mock(user);
      expect(mock).toHaveBeenCalledWith(currentUser);
      done();
    });
  });
});
