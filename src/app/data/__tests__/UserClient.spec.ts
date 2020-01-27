import DoneCallback = jest.DoneCallback;
import {CurrentUser, OtherUsers} from '../../store/user/types';
import {endpoint, host} from '../../../config';
import {get, patch} from '../method';
import {userClient} from '..';
import {UserStatus} from '../../store/user/types/user';

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
  const {create, getAll, logout} = userClient;
  const currentUser: CurrentUser = {name: 'Ryan', id: '1', status: UserStatus.AVAILABLE};
  const newUser = {name: currentUser.name, password: 'your face'};
  const otherUsers: OtherUsers = [
    {name: 'Chirag', id: 'Taylor', status: UserStatus.AVAILABLE},
    {name: 'Chris ', id: 'Schuster', status: UserStatus.LOGGED_OUT}];
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
  const mockLogger = jest.fn();

  beforeEach(() => {
    fetchMock.reset();
    mockHandle.onSuccess.mockReset();
    mockHandle.onClientError.mockReset();
    console.warn = mockLogger;
  });

  describe('creating a user', () => {
    describe('successfully', () => {
      it('should handle the response of creating a user', (done) => {
        const posted = fetchMock.post(`${host}${endpoint.users}`, {
          body: currentUser,
          status: 201,
          headers: {'Content-Type': 'application/json'}
        });

        create(newUser, mockHandle);

        waitUntil(done).then(() => {
          expect(posted.lastOptions().body).toEqual(JSON.stringify(newUser));
          expect(mockHandle.onSuccess).toHaveBeenCalledWith(currentUser);
        });
      });
    });

    describe('when the client receives an error', () => {
      it('should notify', (done) => {
        const error = {username: {value: 'John Stamos', validations: ['USERNAME_UNIQUE']}};
        const posted = fetchMock.post(`${host}${endpoint.users}`, {
          body: error,
          status: 400,
          headers: {'Content-Type': 'application/json'}
        });

        create(newUser, mockHandle);

        waitUntil(done).then(() => {
          expect(posted.lastOptions().body).toEqual(JSON.stringify(newUser));
          expect(mockHandle.onClientError).toHaveBeenCalledWith(error);
        });
      });
    });
  });

  describe('getting all the other users', () => {
    describe('successfully', () => {
      it('should handle the response of getting all the other users', (done) => {
        const request = get({
          exclude: currentUser.id,
          page: 0,
          size: Number.MAX_SAFE_INTEGER
        }, endpoint.users);

        fetchMock.get(`${host}${request.path}`, {
          status: 200,
          body: page
        });

        getAll(currentUser.id, mockHandle);

        waitUntil(done).then(() => {
          expect(mockHandle.onSuccess).toHaveBeenCalledWith(page);
        });
      });
    });
  });

  describe('logging out', () => {
    const id = 'id';
    const body = {status: 'LOGGED_OUT'};
    const request = patch(body, endpoint.users, id);
    const patchResponse = {
      status: 204,
      headers: {'Content-Type': 'application/json'}
    };

    it('should set the status of the user', done => {
      const patched = fetchMock.patch(`${host}${request.path}`, {
        ...patchResponse
      });

      logout(id, mockHandle);

      waitUntil(done).then(() => {
        expect(patched.lastOptions().body).toEqual(JSON.stringify(body));
        expect(mockHandle.onSuccess).toHaveBeenCalled();
      });
    });

    it('should log the wrong response', done => {
      fetchMock.patch(`${host}${request.path}`, {
        ...patchResponse,
        body: {I_AM: 'NOT THE RIGHT STRUCTURE'}
      });

      logout(id, mockHandle);

      waitUntil(done).then(() => {
        expect(mockLogger).toHaveBeenCalled();
      });
    });
  });
});
