import {Store} from '../../../../store/types';
import {NewUser, UserStoreAction} from '../../store/types';
import {createTestStore} from '../../../../__tests__/support/createTestStore';
import reducer from '../reducer';
import {createUserMiddleware} from '../../store/middleware';
import {create} from '../../store/actions';
import {SignupState, UsernameValidation} from '../types';
import {SignupValidationGuard} from '../types/UsernameValidation';
import {selectUsernameErrors} from '../selectors';
import {Handler} from '../../store/data/types';

type CreateSignupErrors = (name: string) => UsernameValidation;

describe('signing up validations', () => {
  const mockCreateUser = jest.fn();
  const username: string = 'Ryan';
  let store: Store<SignupState, UserStoreAction>;

  beforeEach(() => {
    console.warn = jest.fn();
    store = createTestStore(reducer, [createUserMiddleware(mockCreateUser)]);
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
      expect(store.getState().username).toEqual(signupErrors.username);
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
