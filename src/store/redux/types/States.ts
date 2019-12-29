import {State} from './State';

export type States<T = any> = State<State<T>>;

export type AnyStates = States;
