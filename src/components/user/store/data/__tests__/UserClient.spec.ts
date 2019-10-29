import {endpoint} from '../../../../../config';
import {right} from 'fp-ts/lib/Either';
import {CurrentUser, OtherUsers} from '../../types/user';
import {userClient} from '../userClient';

const fetchMock = require('fetch-mock');

jest.mock('../../../../../config', () => ({
  endpoint: {
    users: '/users'
  },
  host: 'http://some-host'
}));

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
    content: otherUsers};
  const mockHandle = {
    success: jest.fn(),
    clientError: jest.fn()
  };

  beforeEach(() => {
    fetchMock.reset();
    mockHandle.success.mockReset();
    mockHandle.clientError.mockReset();
  });

  describe('creating a user', () => {

    describe('success', () => {
      it('should handle the response of creating a user', (done) => {
        fetchMock.post(`end:${endpoint.users}`, {
          body: currentUser,
          status: 201,
          headers: {'Content-Type': 'application/json'}
        });

        create({name: currentUser.name}, mockHandle);

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
        create({name: currentUser.name}, mockHandle);
        setTimeout(() => {
          expect(mockHandle.clientError).toHaveBeenCalledWith(right(body));
          done();
        });
      });
    });
  });

  describe('getting all the other users', () => {
    describe('success', () => {
      it('should handle the response of getting all the other users', (done) => {
        fetchMock.get(`end:${endpoint.users}?exclude=${currentUser.id}&page=0&size=10`, page);

        getAll(currentUser.id, mockHandle);

        setTimeout(() => {
          expect(mockHandle.success).toHaveBeenCalledWith(right(page));
          done();
        });
      });
    });
  });
});
