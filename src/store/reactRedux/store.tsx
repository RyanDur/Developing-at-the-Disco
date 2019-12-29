import * as React from 'react';
import {ComponentProps} from 'react';
import {Action, AnyAction, AnyState, State, States, Store} from '../redux/types';

export const Context = React.createContext(undefined);

export const createProvider = <S extends State | States = AnyState, A extends Action = AnyAction>
(store: Store<S, A>) => ({children}: ComponentProps<any>) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};
