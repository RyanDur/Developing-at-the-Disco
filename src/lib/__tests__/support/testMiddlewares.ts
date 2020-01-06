import {SomeActions, SomeState, SomeStates, TestActions} from './types';
import {Middleware} from '../../redux/types';

type TestState = SomeStates | SomeState;

export const testMiddleware: Middleware<TestState, SomeActions> =
  () => next => action => {
    if (TestActions.MIDDLEWARE_ACTION === action.type) {
      next({type: TestActions.SOME_ACTION, value: action.value});
    }
  };

export const otherTestMiddleware: Middleware<TestState, SomeActions> =
  api => next => action => {
    if (TestActions.OTHER_MIDDLEWARE_ACTION === action.type) {
      next({
        type: TestActions.OTHER_ACTION,
        value: `new value: ${action.value}, current value: ${(api.getState() || {}).other}`
      });
    }
  };

export const otherTestMoreMiddleware: Middleware<TestState, SomeActions> =
  api => next => action => {
    if (TestActions.OTHER_MIDDLEWARE_ACTION === action.type) {
      next({
        type: TestActions.OTHER_ACTION,
        value: `new value: ${action.value}, current value: ${(api.getState().another || {}).other}`
      });
    }
  };

export const anotherTestMiddleware: Middleware<TestState, SomeActions> =
  api => next => action => {
    if (TestActions.ANOTHER_MIDDLEWARE_ACTION === action.type) {
      next({
        type: TestActions.ANOTHER_ACTION,
        value: `new value: ${action.value}, current value: ${(api.getState() || {}).another}`
      });
    }
  };
