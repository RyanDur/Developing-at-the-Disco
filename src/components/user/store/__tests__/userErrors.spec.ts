import {UsernameValidation} from '../../Signup/types';
import {Store} from '../../../../lib/redux/types';
import {combineReducers, createStore} from '../../../../lib/redux';
import {createUserMiddleware} from '../middleware';
import {selectUsernameErrors} from '../selectors';
import {NewUser, UserErrorsState, UserState} from '../types';
import {Handler} from '../data/types';
import {SignupValidationGuard} from '../../Signup/types/UsernameValidation';
import {create} from '../action';
import * as userReducers from '../reducer';
import {UserAction} from '../action/types';

type CreateSignupErrors = (name: string) => UsernameValidation;

interface TestState extends UserState {
  userErrors: UserErrorsState;
}

describe('signing up validations', () => {
  const mockCreateUser = jest.fn();
  const username: string = 'Ryan';
  let store: Store<TestState, UserAction>;

  beforeEach(() => {
    console.warn = jest.fn();
    store = createStore(combineReducers(userReducers), [createUserMiddleware(mockCreateUser)]);
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
      mockCreateUser.mockImplementation((newUser: NewUser, handle: Handler) => {
        const decode = SignupValidationGuard.decode(anError(newUser.name));
        handle.clientError(decode);
      });

      store.dispatch(create(username));
      const signupErrors = anError(username);
      expect(store.getState().userErrors).toEqual(signupErrors);
    });
  });

  describe('an invalid user', () => {
    beforeEach(() => {
      mockCreateUser.mockImplementation(({name}: NewUser, handle: Handler) => {
        handle.clientError(SignupValidationGuard.decode({name, foo: 65}));
      });
      store.dispatch(create(username));
    });

    it('should have no errors', () => {
      expect(selectUsernameErrors(store.getState())).toBeUndefined();
    });

    it('should log the invalid error', () => {
      expect(console.warn).toHaveBeenCalled();
    });
  });
});
