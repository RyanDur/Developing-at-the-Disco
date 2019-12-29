import {Action, AnyAction, AnyStates, Reducer, Reducers, States} from './types';

export const combineReducers =
  <S extends States = AnyStates, A extends Action = AnyAction>
  (reducers: Reducers<S, A>): Reducer<S, A> => {
    const keys: string[] = Object.keys(reducers);
    return (prevState: S = {} as S, action: A) =>
      keys.reduce((acc, key) => {
        const reducer: Reducer = reducers[key];
        return ({...acc, [key]: reducer(prevState[key], action)});
      }, prevState);
  };
