import {Action, Reducers, State} from './index';
import {Reducer} from 'react';

export type ReducerType<S, A> = Reducer<S, A> | Reducers<S, A>;
