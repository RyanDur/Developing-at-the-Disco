import {SomeAction, SomeOtherAction, OtherState, SomeState, TestActions} from './types';
import {Reducer} from '../../redux/types';

export type AnotherState = SomeState | OtherState;
export type AnotherAction = SomeAction | SomeOtherAction;

export const someInitialState: SomeState = {value: 'initial'};
export const anotherInitialState: AnotherState = {value: 'initial', other: 'other initial'};

export const testReducer: Reducer<SomeState, SomeAction> =
  (state = someInitialState, action) =>
    action.type === TestActions.SOME_ACTION ?
      {...state, value: action.value} : state;

export const otherTestReducer: Reducer<OtherState, SomeOtherAction> =
  (state, action) =>
    action.type === TestActions.OTHER_ACTION ?
      {...state, value: action.value} : state;

export const anotherTestReducer: Reducer<AnotherState, AnotherAction> =
  (state = anotherInitialState, action) => {
    switch (action.type) {
    case TestActions.SOME_ACTION:
      return {...state, value: action.value};
    case TestActions.OTHER_ACTION:
      return {...state, other: action.value};
    default:
      return state;
    }
  };

export const testReducers = {
  someState: testReducer,
  otherState: otherTestReducer,
  anotherState: anotherTestReducer
};
