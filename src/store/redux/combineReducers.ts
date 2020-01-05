import {Action, AnyAction, AnyState, Reducer, Reducers, State} from './types';

export const combineReducers = <S extends State = AnyState, A extends Action = AnyAction>
(reducers: Reducers<S, A>): Reducer<S, A> => {
  const keys: string[] = Object.keys(reducers);
  return (prevState: S = {} as S, action: A) =>
    keys.reduce((acc, key) =>
      ({...acc, [key]: reducers[key](prevState[key], action)}), prevState);
};
