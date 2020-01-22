import * as React from 'react';
import {Reducer} from 'react';
import {Action, AnyAction, AnyState, Listener, Middleware, State, Store, Unsubscribe} from './types';
import {start} from './actions';
import {has, remove} from '../util/helpers';
import {MiddlewareAPI} from './types/MiddlewareAPI';

const enhance = <S extends State = AnyState, A extends Action = AnyAction>(
  store: Store<S, A>,
  middlewares: Array<Middleware<S, A>>
): Store<S, A> => {
  const enhancedStore = {...store, dispatch: (action: A) => enhancedDispatch(action)};
  const api: MiddlewareAPI<S, A> = {getState: store.getState, dispatch: enhancedStore.dispatch};

  const enhancedDispatch = middlewares
    .map(middleware => middleware(api))
    .reduce((next, middleware) => middleware(next), store.dispatch);

  return enhancedStore;
};

export const createStore = <S extends State = AnyState, A extends Action = AnyAction>(
  reducer: Reducer<S, A>,
  middlewares?: Array<Middleware<S, A>>,
  state?: S
): Store<S, A> => {
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

  return has(middlewares) ? enhance(store, middlewares) : store;
};
