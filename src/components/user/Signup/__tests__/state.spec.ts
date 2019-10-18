import {Store} from '../../../../store/types';
import {NewUser, UserAction} from '../../store/types';
import {createTestStore} from '../../../../__tests__/support/createTestStore';
import reducer, {initialState} from '../reducer';
import {createUserMiddleware} from '../../store/middleware';
import {create} from '../../store/actions';
import {SignupErrors, SignupState} from '../types';
import {Handler} from '../../store/data/create';
import {SignupValidationGuard} from '../types/UsernameValidation';

type CreateSignupErrors = (name: string) => SignupErrors;

describe('signing up validations', () => {
  const mockCreateUser = jest.fn();
  const username: string = 'Ryan';
  let store: Store<SignupState, UserAction>;

  beforeEach(() => {
    console.warn = jest.fn();
    store = createTestStore(reducer, [createUserMiddleware(mockCreateUser)]);
  });

  it('should be in its initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  describe('the username', () => {
    const anError: CreateSignupErrors = (name): SignupErrors => ({
      username: {
        value: name,
        validations: ['some error']
      }
    });

    it('should be validated', () => {
      mockCreateUser.mockImplementation(({name}: NewUser, handle: Handler) => {
        handle.clientError(SignupValidationGuard.decode(anError(name)));
      });
      store.dispatch(create(username));
      expect(store.getState()).toEqual(anError(username));
    });
  });

  describe('an invalid user', () => {
    beforeEach(() => {
      mockCreateUser.mockImplementation(({name}: NewUser, handle: Handler) => {
        handle.clientError(SignupValidationGuard.decode({name, foo: 65}));
      });
      store.dispatch(create(username));
    });

    it('should be validated', () => {
      expect(store.getState()).toEqual(initialState);
    });

    it('should log the invalid error', () => {
      expect(console.warn).toHaveBeenCalled();
    });
  });
});
