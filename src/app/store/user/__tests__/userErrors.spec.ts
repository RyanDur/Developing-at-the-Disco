import {createUserMiddleware} from '../middleware';
import {NewUser, ResponseHandler, UserErrorsState} from '../types';
import {create, current} from '../action';
import {userErrors} from '../reducer';
import {UserAction} from '../action/types';
import {Store} from '../../../../lib/redux/types';
import {userClient} from '../../../data';
import {createStore} from '../../../../lib/redux';
import {UserStatus} from '../types/user';
import {initialState} from '../reducer/userErrors';

describe('signing up validations', () => {
  const mockCreateUser = jest.fn();
  const username: string = 'Ryan';
  let store: Store<UserErrorsState, UserAction>;
  const userClientSpy = jest.spyOn(userClient, 'create');

  beforeEach(() => {
    console.warn = jest.fn();
    userClientSpy.mockImplementation(mockCreateUser);
    store = createStore(userErrors, [createUserMiddleware]);
  });

  it('should have no errors', () => {
    expect(store.getState()).toEqual(initialState);
  });

  describe('the username', () => {
    const anError = (name: string) => ({
      username: {
        value: name,
        validations: ['some error']
      }
    });

    beforeEach(() => {
      mockCreateUser.mockImplementation((newUser: NewUser, handle: ResponseHandler) => {
        handle.onClientError(anError(newUser.name));
      });
      store.dispatch(create(username));
    });

    it('should be validated', () => {
      expect(store.getState()).toEqual(anError(username));
    });

    describe('when the error is corrected', () => {
      it('should reset the errors', () => {
        store.dispatch(current({name: 'J. Blackburn', id: 'how are you doing', status: UserStatus.AVAILABLE}));
        expect(store.getState()).toEqual(initialState);
      });
    });
  });
});
