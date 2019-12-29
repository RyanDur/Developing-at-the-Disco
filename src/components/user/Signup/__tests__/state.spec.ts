import {NewUser, UserComponentState} from '../../store/types';
import reducer from '../reducer';
import {createUserMiddleware} from '../../store/middleware';
import {create} from '../../store/actions';
import {UsernameValidation} from '../types';
import {SignupValidationGuard} from '../types/UsernameValidation';
import {selectUsernameErrors} from '../selectors';
import {Handler} from '../../store/data/types';
import {Store} from '../../../../store/redux/types';
import {combineReducers, createStore} from '../../../../store/redux';
import {UserMiddlewareAction, UserMiddlewareState} from '../../store/middleware/types';

type CreateSignupErrors = (name: string) => UsernameValidation;

describe('signing up validations', () => {
  const mockCreateUser = jest.fn();
  const username: string = 'Ryan';
  let store: Store<UserMiddlewareState, UserMiddlewareAction>;

  beforeEach(() => {
    console.warn = jest.fn();
    store = createStore(combineReducers({signup: reducer}), [createUserMiddleware(mockCreateUser)]);
  });

  it('should have no errors', () => {
    expect(selectUsernameErrors(store.getState() as UserComponentState)).toBeUndefined();
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
      expect(store.getState().signup).toEqual(signupErrors);
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
      expect(selectUsernameErrors(store.getState() as UserComponentState)).toBeUndefined();
    });

    it('should log the invalid error', () => {
      expect(console.warn).toHaveBeenCalled();
    });
  });
});
