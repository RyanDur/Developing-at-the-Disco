import {MiddlewareAction, OtherMiddlewareAction, SomeAction, SomeOtherAction, TestActions} from './types';
import {AnotherAction, AnotherMiddlewareAction} from './types/SomeAction';

export const someAction: SomeAction = {type: TestActions.SOME_ACTION, value: 'some value'};
export const otherAction: SomeOtherAction = {type: TestActions.OTHER_ACTION, value: 'other value'};
export const anotherAction: AnotherAction = {type: TestActions.ANOTHER_ACTION, value: 'another value'};

export const middlewareAction: MiddlewareAction = {
  type: TestActions.MIDDLEWARE_ACTION,
  value: 'middleware updated value'
};

export const otherMiddlewareAction: OtherMiddlewareAction = {
  type: TestActions.OTHER_MIDDLEWARE_ACTION,
  value: 'other middleware updated value'
};

export const anotherMiddlewareAction: AnotherMiddlewareAction = {
  type: TestActions.ANOTHER_MIDDLEWARE_ACTION,
  value: 'another middleware updated value'
};
