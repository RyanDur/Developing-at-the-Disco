import {UsernameValidation} from '../../Signup/types';
import {Store} from '../../../../lib/redux/types';
import {combineReducers, createStore} from '../../../../lib/redux';
import {createUserMiddleware} from '../middleware';
import {selectUsernameErrors} from '../selectors';
import {NewUser, UserErrorsState, UserState} from '../types';
import {Handlers} from '../data/types';
import {create} from '../action';
import * as userReducers from '../reducer';
import {UserAction} from '../action/types';
import {userClient} from '../data';

type CreateSignupErrors = (name: string) => UsernameValidation;

interface TestState extends UserState {
  userErrors: UserErrorsState;
}

describe('signing up validations', () => {
  const mockCreateUser = jest.fn();
  const username: string = 'Ryan';
  let store: Store<TestState, UserAction>;
  const userClientSpy = jest.spyOn(userClient, 'create');

  beforeEach(() => {
    console.warn = jest.fn();
    userClientSpy.mockImplementation(mockCreateUser);
    store = createStore(combineReducers(userReducers), [createUserMiddleware]);
  });

  it('should have no errors', () => {
    expect(selectUsernameErrors(store.getState())).toBeUndefined();
  });

  describe('the username', () => {
    const anError: CreateSignupErrors = (name) => ({
      username: {
        value: name,
        validations: ['some error']
      }
    });

    it('should be validated', () => {
      mockCreateUser.mockImplementation((newUser: NewUser, handle: Handlers) => {
        handle.onClientError(anError(newUser.name));
      });

      store.dispatch(create(username));
      const signupErrors = anError(username);
      expect(store.getState().userErrors).toEqual(signupErrors);
    });
  });
});
