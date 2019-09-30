import reducer, {initialState} from '../reducer';
import {create, update} from '../actions';
import {createTestStore} from '../../../../__tests__/support/createTestStore';
import {createUserMiddleware} from '../middleware';
import {CurrentUser, NewUser, UserAction, UserState} from '../types';
import {Store} from '../../../../store/types';

describe('user store:', () => {
  const mockCreateUser = jest.fn();
  let store: Store<UserState, UserAction>;

  beforeEach(() => {
    store = createTestStore(reducer, [createUserMiddleware(mockCreateUser)]);
  });

  describe('on start', () => {
    it('should have an initial state', () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe('when creating a user', () => {
    const id = 3;

    beforeEach(() => {
      mockCreateUser.mockReset();
      mockCreateUser.mockImplementation(({name}: NewUser, func: (user: CurrentUser) => void) => {
        func({name, id});
      });
    });

    it('should update the current user', () => {
      const name = 'Ryan';
      store.dispatch(create(name));

      expect(store.getState()).toEqual({...initialState, current: {name, id}});
    });

    it('should only create when needed', () => {
      store.dispatch(update({name: 'some name', id}));

      expect(mockCreateUser).not.toHaveBeenCalled();
    });
  });
});
