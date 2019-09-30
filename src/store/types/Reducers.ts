import {Reducer} from 'react';

export interface Reducers<S, A> {
  [x: string]: Reducer<S, A>;
}
