import reducer, {initialState} from '../reducer';
import {create, update} from '../actions';
import {createTestStore} from '../../../../__tests__/support/createTestStore';
import {createUserMiddleware, getOtherUsersMiddleware} from '../middleware';
import {Store} from '../../../../store/types';
import {CurrentUserGuard} from '../types/user/CurrentUser';
import {NewUser, UserStoreAction, UserStoreState} from '../types';
import {OtherUsersGuard, UserId, Username} from '../types/user';
import {Handler} from '../data/types';

describe('user store:', () => {
  const mockCreateUser = jest.fn();
  const mockGetOtherUsers = jest.fn();
  const username: Username = 'Travis';
  const id: UserId = '3' as UserId;
  let store: Store<UserStoreState, UserStoreAction>;

  beforeEach(() => {
    store = createTestStore(reducer, [
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

      beforeEach(() => {
        mockCreateUser.mockReset();
        mockCreateUser.mockImplementation((name: Username, handleCreate: Handler) => {
          const decode = CurrentUserGuard.decode({name, id});
          handleCreate.success(decode);
        });

        mockGetOtherUsers.mockReset();
        mockGetOtherUsers.mockImplementation((currentUserId: UserId, handleGet: Handler) => {
          handleGet.success(OtherUsersGuard.decode(otherUsers));
        });

        store.dispatch(create(username));
      });

      it('should update the current user', () => {
        const expected = {name: username, id};
        expect(store.getState().current).toEqual(expected);
      });

      it('should get all the other users', () => {
        expect(store.getState().others).toEqual(otherUsers);
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
