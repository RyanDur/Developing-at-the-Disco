import * as React from 'react';
import {Reducer, useReducer} from 'react';
import {Action, AnyAction, AppContext, Middleware, Reducers, ReducerType, Store} from './types';
import {InitAction, start} from './actions';

const singleReducerContext = <S, A extends Action = AnyAction>
(reducer: Reducer<S, A | InitAction>): Partial<AppContext<S>> => {
  const initialState = reducer(undefined, start());
  try {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch};
  } catch (e) {
    console.log(e);
  }
  return {};
};

const multipleReducersContext = <S, A extends Action = AnyAction>(reducers: Reducers<S, A>): AppContext<S> =>
  Object.keys(reducers).reduce<any>((acc: AppContext<S>, key: string) => {
    const {state, dispatch} = singleReducerContext(reducers[key]);
    return {
      state: {[key]: state, ...(acc.state || {})}, dispatch: (action: A) => {
        if (acc.dispatch) acc.dispatch(action);
        dispatch(action);
      }
    };
  }, {});

const enhance = <S, A extends Action = AnyAction>(
  store: Store<S, A>,
  middlewares: Array<Middleware<S, A>>
): Store<S, A> => {
  const dispatch = (action: A): void => {
    wares.forEach(ware => ware(action));
    store.dispatch(action);
  };

  const wares = middlewares
    .map(ware => ware({...store, dispatch}))
    .map(ware => ware(store.dispatch));

  return ({
    ...store,
    dispatch
  });
};

export const createStore = <S, A extends Action = AnyAction>(
  reducer: ReducerType<S, A>,
  middlewares?: Array<Middleware<S, A>>): Store<S, A> => {
  const {state, dispatch} = (typeof reducer === 'function') ?
    singleReducerContext(reducer) :
    multipleReducersContext(reducer);

  const store = {getState: () => state, dispatch};

  return middlewares ? enhance(store, middlewares) : store;
};
