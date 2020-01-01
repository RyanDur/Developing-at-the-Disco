import {create, update} from '../action';
import {createUserMiddleware, getOtherUsersMiddleware} from '../middleware';
import {CurrentUserGuard} from '../types/user/CurrentUser';
import {NewUser, UserId, Username} from '../types/user';
import {Handler, OtherUsersPageGuard} from '../data/types';
import {Store} from '../../../../store/redux/types';
import {createStore} from '../../../../store/redux';
import {UsersState} from '../types';
import {users} from '../reducer';
import {initialState} from '../reducer/users';
import {UserAction} from '../action/types';

describe('user store:', () => {
  const mockCreateUser = jest.fn();
  const mockGetOtherUsers = jest.fn();
  const username: Username = 'Travis';
  const id: UserId = '3' as UserId;
  let store: Store<UsersState, UserAction>;

  beforeEach(() => {
    store = createStore(users, [
      createUserMiddleware(mockCreateUser),
      getOtherUsersMiddleware(mockGetOtherUsers)
    ]);
  });

  describe('on start', () => {
    it('should have an initial state', () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe('when creating a user', () => {
    it('should only create when needed', () => {
      store.dispatch(update({name: username, id}));

      expect(mockCreateUser).not.toHaveBeenCalled();
    });

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
        mockCreateUser.mockImplementation((name: NewUser, handleCreate: Handler) => {
          handleCreate.success(CurrentUserGuard.decode({...name, id}));
        });

        mockGetOtherUsers.mockReset();
        mockGetOtherUsers.mockImplementation((currentUserId: UserId, handleGet: Handler) => {
          const decode = OtherUsersPageGuard.decode(otherUsersPage);
          handleGet.success(decode);
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
    });
  });

  describe('getting an incorrect response', () => {
    beforeEach(() => {
      console.warn = jest.fn();
      mockCreateUser.mockReset();
      mockCreateUser.mockImplementation(({name}: NewUser, handle: Handler) => {
        handle.success(CurrentUserGuard.decode({name, goo: 33}));
      });
      store.dispatch(create(username));
    });

    it('should log it', () => {
      expect(console.warn).toHaveBeenCalled();
    });

    it('should not create the current user', () => {
      expect(store.getState()).toEqual(initialState);
    });
  });
});
