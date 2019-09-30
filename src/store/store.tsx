import * as React from 'react';
import {ComponentProps} from 'react';
import {createStore} from './createStore';
import {Action, AnyAction, Middleware, ReducerType} from './types';
import {createConnect} from './connect';

const Store = React.createContext(undefined);

const createProvider = <S, A extends Action = AnyAction>(
  reducers: ReducerType<S, A>,
  middlewares?: Array<Middleware<S, A>>) =>
  ({children}: ComponentProps<any>) => {
    const store = createStore(reducers, middlewares);
    return <Store.Provider value={{...store, state: store.getState()}}>{children}</Store.Provider>;
  };

const connect = createConnect(Store);

export {connect, createProvider};
