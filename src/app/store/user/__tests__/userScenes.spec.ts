import {UserScenesState} from '../types';
import {UserScenesAction} from '../action/types';
import {logoutSuccess, signupDone} from '../action';
import {userScenes} from '../reducer';
import {Store} from '../../../../lib/redux/types';
import {createStore} from '../../../../lib/redux';
import {initialState} from '../reducer/userScenes';

describe('user scenes', () => {
  let store: Store<UserScenesState, UserScenesAction>;

  beforeEach(() => store = createStore(userScenes));

  it('should be in its initial state', () =>
    expect(store.getState()).toEqual(initialState));

  describe('when signup is done', () => {
    beforeEach(() => {
      store.dispatch(signupDone(true));
    });

    it('should update when the signup scene is done', () => {
      expect(store.getState().signupDone).toEqual(true);
    });

    describe('when the user logs out', () => {
      it('should reset the state', () => {
        store.dispatch(logoutSuccess());
        expect(store.getState()).toEqual(initialState);
      });
    });
  });

});
