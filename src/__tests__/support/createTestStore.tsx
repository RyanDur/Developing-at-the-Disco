import * as React from 'react';
import {ReactElement} from 'react';
import {Action, AnyAction, Middleware, ReducerType, Store} from '../../store/types';
import {createStore} from '../../store/createStore';
import TestRenderer, {act} from 'react-test-renderer';

const Store = React.createContext({});

interface TestProps<S, A extends Action = AnyAction> {
  store: Store<S, A>;
}

const TestElement = <S, A extends Action = AnyAction>(props: TestProps<S, A>) => {
  return <section/>;
};

export const createTestStore = <S, A extends Action = AnyAction>
(reducer: ReducerType<S, A>, middlewares: Array<Middleware<S, A>>) => {

  const createTestProvider = () => (): ReactElement => {
    const store = createStore(reducer, middlewares);

    return <Store.Provider value={store}>
      <TestElement store={store}/>
    </Store.Provider>;
  };

  const Provider = createTestProvider();
  const instance = TestRenderer.create(<Provider/>).root.findByType(TestElement);

  return {
    getState: () => instance.props.store.getState(),
    dispatch: (action: AnyAction) => act(() => instance.props.store.dispatch(action))
  };
};
