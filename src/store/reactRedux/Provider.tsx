import * as React from 'react';
import {ComponentProps} from 'react';
import {Action, AnyAction, AnyState, State, States, Store} from '../redux/types';

export const Context = React.createContext(undefined);

interface ProviderProps<S extends State | States = AnyState, A extends Action = AnyAction> {
  store: Store<S, A>;
}

export const Provider = ({store, children}: ProviderProps | ComponentProps<any>) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};
