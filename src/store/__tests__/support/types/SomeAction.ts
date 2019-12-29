import {Action} from '../../../redux/types';

export enum TestActions {
  SOME_ACTION = 'SOME_ACTION',
  OTHER_ACTION = 'OTHER_ACTION',
  ANOTHER_ACTION = 'ANOTHER_ACTION',
  MIDDLEWARE_ACTION = 'MIDDLEWARE_ACTION',
  OTHER_MIDDLEWARE_ACTION = 'OTHER_MIDDLEWARE_ACTION',
  ANOTHER_MIDDLEWARE_ACTION ='ANOTHER_MIDDLEWARE_ACTION'
}

export interface SomeAction extends Action<TestActions.SOME_ACTION> {
  value: string;
}

export interface OtherAction extends Action<TestActions.OTHER_ACTION> {
  value: string;
}

export interface AnotherAction extends Action<TestActions.ANOTHER_ACTION> {
  value: string;
}

export interface MiddlewareAction extends Action<TestActions.MIDDLEWARE_ACTION> {
  value: string;
}

export interface OtherMiddlewareAction extends Action<TestActions.OTHER_MIDDLEWARE_ACTION> {
  value: string;
}

export interface AnotherMiddlewareAction extends Action<TestActions.ANOTHER_MIDDLEWARE_ACTION> {
  value: string;
}

export type MiddlewareActions = MiddlewareAction | OtherMiddlewareAction | AnotherMiddlewareAction;
export type ReducerActions = SomeAction | OtherAction | AnotherAction;
