import * as React from 'react';
import {Reducer} from 'react';
import {Action, AnyAction, AnyState, Dispatch, Listener, Middleware, State, Store, Unsubscribe} from './types';
import {start} from './actions';
import {remove} from '../util/helpers';

const enhance = <S extends State = AnyState, A extends Action = AnyAction>(
  store: Store<S, A>,
  middlewares: Array<Middleware<S, A>>
): Store<S, A> => {
  const enhancedDispatch: Dispatch<A> = (action) => {
    partiallyApplied.forEach(middleware => middleware(action));
    store.dispatch(action);
  };

  const enhancedStore = {...store, dispatch: enhancedDispatch};

  const partiallyApplied = middlewares
    .map(middleware => middleware(enhancedStore))
    .map(middleware => middleware(store.dispatch));

  return enhancedStore;
};

export const createStore = <S extends State = AnyState, A extends Action = AnyAction>(
  reducer: Reducer<S, A>,
  middlewares?: Array<Middleware<S, A>>
): Store<S, A> => {
  let state: S;
  let listeners: Listener[] = [];
  let updatingState = false;

  const store: Store<S> = {
    getState: () => {
      if (updatingState) throw new Error('Do not call "getState" while the state is updating.');
      return state;
    },
    dispatch: (action: A) => {
      updatingState = true;
      state = reducer(state, action);
      updatingState = false;
      listeners.forEach(listener => listener());
    },
    subscribe: (listener: Listener): Unsubscribe => {
      listeners = [...listeners, listener];
      return (): void => {
        listeners = remove(listener, listeners);
      };
    }
  };

  store.dispatch(start() as A);

  return middlewares ? enhance(store, middlewares) : store;
};
