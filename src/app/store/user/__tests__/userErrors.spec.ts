import {createUserMiddleware} from '../middleware';
import {NewUser, ResponseHandler, ErrorsState} from '../types';
import {createNewUser, current} from '../action';
import {errors} from '../reducer';
import {ErrorsAction, UserAction} from '../action/types';
import {Store} from '../../../../lib/redux/types';
import {userClient} from '../../../data';
import {createStore} from '../../../../lib/redux';
import {UserStatus} from '../types/user';
import {initialState} from '../reducer/errors';

describe('signing up validations', () => {
  const mockCreateUser = jest.fn();
  const username: string = 'Ryan';
  let store: Store<ErrorsState, ErrorsAction>;
  const userClientSpy = jest.spyOn(userClient, 'create');

  beforeEach(() => {
    console.warn = jest.fn();
    userClientSpy.mockImplementation(mockCreateUser);
    store = createStore(errors, [createUserMiddleware]);
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
      store.dispatch(createNewUser(username, 'password'));
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
