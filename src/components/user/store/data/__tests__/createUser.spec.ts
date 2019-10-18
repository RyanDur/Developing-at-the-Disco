import {createUser} from '../create';
import {endpoint} from '../../../../../config';
import {right} from 'fp-ts/lib/Either';
import {CurrentUser} from '../../types/user';

const fetchMock = require('fetch-mock');

jest.mock('../../../../../config', () => ({
  endpoint: {
    users: '/users',
    host: 'http://some-host'
  }
}));

describe('creating a user', () => {
  const currentUser: CurrentUser = {name: 'Ryan', id: '1'};
  const mockHandle = {
    success: jest.fn(),
    clientError: jest.fn()
  };

  beforeEach(() => {
    fetchMock.reset();
  });

  describe('success', () => {
    it('should handle the response of creating a user', (done) => {
      fetchMock.post(`end:${endpoint.users}`, {
        body: currentUser,
        status: 201,
        headers: {'Content-Type': 'application/json'}
      });
      createUser({name: 'Ryan'}, mockHandle);
      setTimeout(() => {
        expect(mockHandle.success).toHaveBeenCalledWith(right(currentUser));
        done();
      });
    });
  });

  describe('client error', () => {
    it('should handle client errors', (done) => {
      const body = {username: {value: 'John Stamos', validations: ['USERNAME_UNIQUE']}};
      fetchMock.post(`end:${endpoint.users}`, {
        body,
        status: 400,
        headers: {'Content-Type': 'application/json'}
      });
      createUser({name: 'Ryan'}, mockHandle);
      setTimeout(() => {
        expect(mockHandle.clientError).toHaveBeenCalledWith(right(body));
        done();
      });
    });
  });
});
