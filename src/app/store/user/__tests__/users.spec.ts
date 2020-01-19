import {create, logout} from '../action';
import {createUserMiddleware, getOtherUsersMiddleware, logoutMiddleware} from '../middleware';
import {NewUser, UserId, Username} from '../types/user';
import {ResponseHandler, UsersState} from '../types';
import {users} from '../reducer';
import {initialState} from '../reducer/users';
import {UserAction} from '../action/types';
import {Store} from '../../../../lib/redux/types';
import {userClient} from '../../../data';
import {createStore} from '../../../../lib/redux';

describe('user store:', () => {
  const mockCreateUser = jest.fn();
  const mockGetOtherUsers = jest.fn();
  const mockLogout = jest.fn();
  const username: Username = 'Travis';
  const id: UserId = '3' as UserId;
  let store: Store<UsersState, UserAction>;

  const createSpy = jest.spyOn(userClient, 'create');
  const getAllSpy = jest.spyOn(userClient, 'getAll');
  const logoutSpy = jest.spyOn(userClient, 'logout');

  beforeEach(() => {
    createSpy.mockImplementation(mockCreateUser);
    getAllSpy.mockImplementation(mockGetOtherUsers);
    logoutSpy.mockImplementation(mockLogout);
    store = createStore(users, [
      createUserMiddleware,
      getOtherUsersMiddleware,
      logoutMiddleware
    ]);
  });

  describe('on start', () => {
    it('should have an initial state', () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe('when creating a user', () => {
    describe('on success', () => {
      const otherUsers = [{name: 'Hayes', id: 'David'}];
      const otherUsersPage = {
        content: otherUsers,
        totalPages: 1,
        totalElements: 1,
        size: 1,
        number: 0,
        numberOfElements: 1,
        first: true,
        last: true,
        empty: false
      };

      beforeEach(() => {
        mockCreateUser.mockReset();
        mockCreateUser.mockImplementation((name: NewUser, handleCreate: ResponseHandler) => {
          handleCreate.onSuccess({...name, id});
        });

        mockGetOtherUsers.mockReset();
        mockGetOtherUsers.mockImplementation((currentUserId: UserId, handleGet: ResponseHandler) => {
          handleGet.onSuccess(otherUsersPage);
        });

        store.dispatch(create(username));
      });

      it('should update the current user', () => {
        const expected = {name: username, id};
        expect(store.getState().current).toEqual(expected);
      });

      it('should get all the other users', () => {
        expect(store.getState().others).toEqual(otherUsersPage);
      });

      describe('logging out', () => {
        describe('on success', () => {
          it('should reset the state', () => {
            mockLogout.mockImplementation((userId: string, handle: ResponseHandler) => {
              handle.onSuccess({});
            });

            store.dispatch(logout(id));

            expect(store.getState()).toEqual(initialState);
          });
        });
      });
    });
  });
});
