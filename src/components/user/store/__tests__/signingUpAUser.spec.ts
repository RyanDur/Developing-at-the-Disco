import reducer, {initialState} from '../reducer';
import {create, update} from '../actions';
import {createTestStore} from '../../../../__tests__/support/createTestStore';
import {createUserMiddleware} from '../middleware';
import {Store} from '../../../../store/types';
import {Handler} from '../data/create';
import {CurrentUserGuard} from '../types/user/CurrentUser';
import {NewUser, UserStoreAction, UserStoreState} from '../types';

describe('user store:', () => {
  const mockCreateUser = jest.fn();
  const username = 'Ryan';
  let store: Store<UserStoreState, UserStoreAction>;

  beforeEach(() => {
    store = createTestStore(reducer, [createUserMiddleware(mockCreateUser)]);
  });

  describe('on start', () => {
    it('should have an initial state', () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe('when creating a user', () => {
    const id = '3';

    beforeEach(() => {
      mockCreateUser.mockReset();
      mockCreateUser.mockImplementation(({name}: NewUser, handle: Handler) => {
        handle.success(CurrentUserGuard.decode({name, id}));
      });
    });

    it('should update the current user', () => {
      store.dispatch(create(username));

      expect(store.getState()).toEqual({...initialState, current: {name: username, id}});
    });

    it('should only create when needed', () => {
      store.dispatch(update({name: 'some name', id}));

      expect(mockCreateUser).not.toHaveBeenCalled();
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
