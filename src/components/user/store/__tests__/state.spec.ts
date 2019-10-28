import reducer, {initialState} from '../reducer';
import {create, update} from '../actions';
import {createTestStore} from '../../../../__tests__/support/createTestStore';
import {createUserMiddleware, getOtherUsersMiddleware} from '../middleware';
import {Store} from '../../../../store/types';
import {CurrentUserGuard} from '../types/user/CurrentUser';
import {NewUser, UserStoreAction, UserStoreState} from '../types';
import {UserId, Username} from '../types/user';
import {Handler, OtherUsersPageGuard} from '../data/types';

describe('user store:', () => {
  const mockCreateUser = jest.fn();
  const mockGetOtherUsers = jest.fn();
  const username: Username = 'Travis';
  const id: UserId = '3' as UserId;
  let store: Store<UserStoreState, UserStoreAction>;

  beforeEach(() => {
    store = createTestStore({users: reducer}, [
      createUserMiddleware(mockCreateUser),
      getOtherUsersMiddleware(mockGetOtherUsers)
    ]);
  });

  describe('on start', () => {
    it('should have an initial state', () => {
      expect(store.getState().users).toEqual(initialState);
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
        sort: {},
        pageable: {},
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
        expect(store.getState().users.current).toEqual(expected);
      });

      it('should get all the other users', () => {
        expect(store.getState().users.others).toEqual(otherUsersPage);
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
      expect(store.getState().users).toEqual(initialState);
    });
  });
});
