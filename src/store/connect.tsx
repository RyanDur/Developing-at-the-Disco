import * as React from 'react';
import {ComponentProps, ComponentType, Context, Dispatch, useContext} from 'react';
import {Action, AppContext} from './types';

export const createConnect = <S, A extends Action, C extends AppContext<S>>(store: Context<C>) =>
  <MSP extends S, MDP = void>(
    mapStateToProps?: (state: S, props?: S) => MSP,
    mapDispatchToProps?: (dispatch: Dispatch<A>, props?: S) => MDP
  ) => (WrappedComponent: ComponentType<MSP & MDP & Partial<ComponentProps<any>>>) =>
    (props: ComponentProps<any>): JSX.Element => {
      const {dispatch, state} = useContext(store);
      return <WrappedComponent {...{
        ...props,
        ...(mapStateToProps ? mapStateToProps(state, props) : {}),
        ...(mapDispatchToProps ? mapDispatchToProps(dispatch, props) : {})
      }}/>;
    };
