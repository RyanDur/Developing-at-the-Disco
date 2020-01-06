import {createStore} from '../../../../lib/redux';
import {Store} from '../../../../lib/redux/types';
import {UserScenesState} from '../types';
import {UserScenesAction} from '../action/types';
import {signupDone} from '../action';
import {userScenes} from '../reducer';

describe('user scenes', () => {
  let store: Store<UserScenesState, UserScenesAction>;

  beforeEach(() => store = createStore(userScenes));

  it('should be in its initial state', () =>
    expect(store.getState()).toEqual({signupDone: false}));

  it('should update when the signup scene is done', () => {
    store.dispatch(signupDone(true));
    const state = store.getState();
    expect(state).toEqual({...state, signupDone: true});
  });
});
