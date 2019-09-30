import {State} from '../../types';
import {OtherTestState} from './OtherTestState';

export type TestState = ValueState | OtherTestState;

export interface ValueState extends State {
  value: string;
}
