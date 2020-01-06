import {SomeOtherAction} from './SomeOtherAction';
import {SomeAnotherAction} from './SomeAnotherAction';
import {
  MiddlewareAction,
  MiddlewareActions,
  OtherMiddlewareAction,
  ReducerActions,
  SomeAction,
  TestActions
} from './SomeAction';
import {SomeState} from './SomeState';
import {OtherState} from './OtherState';
import {SomeAnotherState} from './SomeAnotherState';
import {States} from '../../../redux/types';
import {AnotherState} from '../TestReducers';

type SomeActions = ReducerActions | MiddlewareActions;

type TestStates = SomeState | OtherState;

interface SomeStates extends States<TestStates> {
  some: SomeState;
  other: OtherState;
}

export {
  AnotherState,
  SomeOtherAction,
  SomeAnotherAction,
  SomeAction,
  SomeActions,
  SomeState,
  SomeStates,
  OtherState,
  SomeAnotherState,
  MiddlewareAction,
  OtherMiddlewareAction,
  TestActions,
  TestStates,
  MiddlewareActions,
  ReducerActions
};
