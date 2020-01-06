import {Action, AnyAction, AnyState, Reducer, Reducers, State} from './types';

export const combineReducers = <S extends State = AnyState, A extends Action = AnyAction>
(reducers: Reducers<S, A>): Reducer<S, A> => {
  const states = Object.keys(reducers);
  return (previous = {} as S, action) =>
    states.reduce((updated, state) => ({
      ...updated,
      [state]: reducers[state](previous[state], action)
    }), previous);
};
