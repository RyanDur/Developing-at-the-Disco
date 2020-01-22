import {PageState} from '../types';
import {logoutSuccess, pageDone} from '../action';
import {pages} from '../reducer';
import {Store} from '../../../../lib/redux/types';
import {createStore} from '../../../../lib/redux';
import {initialState} from '../reducer/pages';
import {Page, PageAction} from '../action/types';

describe('user scenes', () => {
  let store: Store<PageState, PageAction>;

  beforeEach(() => store = createStore(pages));

  it('should be in its initial state', () =>
    expect(store.getState()).toEqual(initialState));

  describe('when signup is done', () => {
    beforeEach(() => {
      store.dispatch(pageDone(Page.SIGNUP));
    });

    it('should update when the signup scene is done', () => {
      expect(store.getState().page).toEqual(Page.SIGNUP);
    });

    describe('when the user logs out', () => {
      it('should reset the state', () => {
        store.dispatch(logoutSuccess());
        expect(store.getState()).toEqual(initialState);
      });
    });
  });

});
