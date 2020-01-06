export interface State<T = any> {
  [KEY: string]: T;
}

export type AnyState = State;
