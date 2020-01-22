import {SomeActions, SomeState, SomeStates, TestActions} from './types';
import {Middleware} from '../../redux/types';

type TestState = SomeStates | SomeState;

export const testMiddleware: Middleware<TestState, SomeActions> =
  () => next => action => {
    if (TestActions.MIDDLEWARE_ACTION === action.type) {
      next({type: TestActions.SOME_ACTION, value: action.value});
    }
    next(action);
  };

export const otherTestMiddleware: Middleware<TestState, SomeActions> =
  api => next => action => {
    if (TestActions.OTHER_MIDDLEWARE_ACTION === action.type) {
      next({
        type: TestActions.OTHER_ACTION,
        value: `new value: ${action.value}, current value: ${(api.getState() || {}).other}`
      });
    }
    next(action);
  };

export const otherTestMoreMiddleware: Middleware<TestState, SomeActions> =
  api => next => action => {
    if (TestActions.OTHER_MIDDLEWARE_ACTION === action.type) {
      next({
        type: TestActions.OTHER_ACTION,
        value: `new value: ${action.value}, current value: ${(api.getState().another || {}).other}`
      });
    }
    next(action);
  };

export const anotherTestMiddleware: Middleware<TestState, SomeActions> =
  api => next => action => {
    if (TestActions.ANOTHER_MIDDLEWARE_ACTION === action.type) {
      next({
        type: TestActions.ANOTHER_ACTION,
        value: `new value: ${action.value}, current value: ${(api.getState() || {}).another}`
      });
    }
    next(action);
  };
