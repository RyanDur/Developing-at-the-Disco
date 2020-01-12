import {userClient} from '../userClient';
import DoneCallback = jest.DoneCallback;
import {CurrentUser} from '../../store/user/types';
import {OtherUsers} from '../../store/user/types/user';
import {endpoint, host} from '../../../config';

const fetchMock = require('fetch-mock');

jest.mock('../../../config', () => ({
  endpoint: {
    users: '/users'
  },
  host: 'http://some-host'
}));

const waitUntil = (done: DoneCallback) => ({
  then: (expectation: () => void) => {
    setTimeout(() => {
      expectation();
      done();
    });
  }
});

describe('the user client', () => {
  const {create, getAll} = userClient;
  const currentUser: CurrentUser = {name: 'Ryan', id: '1'};
  const otherUsers: OtherUsers = [
    {name: 'Chirag', id: 'Taylor'},
    {name: 'Chris ', id: 'Schuster'}];
  const page = {
    empty: false,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 2,
    size: 2,
    totalElements: 3,
    totalPages: 1,
    content: otherUsers
  };
  const mockHandle = {
    onSuccess: jest.fn(),
    onClientError: jest.fn()
  };

  beforeEach(() => {
    fetchMock.reset();
    mockHandle.onSuccess.mockReset();
    mockHandle.onClientError.mockReset();
  });

  describe('creating a user', () => {
    describe('success', () => {
      it('should handle the response of creating a user', (done) => {
        fetchMock.post(`${host}${endpoint.users}`, {
          body: currentUser,
          status: 201,
          headers: {'Content-Type': 'application/json'}
        });

        create({name: currentUser.name}, mockHandle);

        waitUntil(done).then(() => {
          expect(mockHandle.onSuccess).toHaveBeenCalledWith(currentUser);
        });
      });
    });

    describe('client error', () => {
      it('should handle client errors', (done) => {
        const body = {username: {value: 'John Stamos', validations: ['USERNAME_UNIQUE']}};
        fetchMock.post(`${host}${endpoint.users}`, {
          body,
          status: 400,
          headers: {'Content-Type': 'application/json'}
        });

        create({name: currentUser.name}, mockHandle);

        waitUntil(done).then(() => {
          expect(mockHandle.onClientError).toHaveBeenCalledWith(body);
        });
      });
    });
  });

  describe('getting all the other users', () => {
    describe('success', () => {
      it('should handle the response of getting all the other users', (done) => {
        fetchMock.get(`${host}${endpoint.users}?exclude=${currentUser.id}&page=0&size=${Number.MAX_SAFE_INTEGER}`, page);

        getAll(currentUser.id, mockHandle);

        waitUntil(done).then(() => {
          expect(mockHandle.onSuccess).toHaveBeenCalledWith(page);
        });
      });
    });
  });
});
