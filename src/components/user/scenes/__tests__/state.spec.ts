import reducer, {UserScenesState} from '../reducer';
import {signupDone, UserScenesAction} from '../actions';
import {createStore} from '../../../../store/redux';
import {Store} from '../../../../store/redux/types';

describe('user scenes', () => {
  let store: Store<UserScenesState, UserScenesAction>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('should be in its initial state', () => {
    expect(store.getState()).toEqual({signupDone: false});
  });

  it('should update when the signup scene is done', () => {
    store.dispatch(signupDone(true));
    const state = store.getState();
    expect(state).toEqual({...state, signupDone: true});
  });
});
