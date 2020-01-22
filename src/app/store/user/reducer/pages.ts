import {UserActions, PageAction, PageActions} from '../action/types';
import {PageState} from '../types';
import {Reducer} from '../../../../lib/redux/types';

export const initialState: PageState = {};

export const pages: Reducer<PageState, PageAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case PageActions.DONE:
        return {...state, page: action.page};
      case UserActions.LOGOUT_SUCCESS:
        return initialState;
      default:
        return state;
    }
  };
