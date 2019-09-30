import {Action} from '../../types';
import {OtherAction} from './OtherAction';

export enum TestAction {
  SOME_ACTION = 'SOME ACTION',
  OTHER_ACTION = 'OTHER ACTION',
  MIDDLEWARE_ACTION = 'middleware action',
  OTHER_MIDDLEWARE_ACTION = 'other middleware action'
}

export type TestActionType = SomeAction | OtherAction | MiddlewareAction | OtherMiddlewareAction;

export interface SomeAction extends Action<TestAction.SOME_ACTION> {
  value: string;
}

export interface MiddlewareAction extends Action<TestAction.MIDDLEWARE_ACTION> {}
export interface OtherMiddlewareAction extends Action<TestAction.OTHER_MIDDLEWARE_ACTION> {}
