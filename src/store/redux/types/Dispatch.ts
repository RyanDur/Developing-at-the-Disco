import {Action, AnyAction} from './Action';

export type Dispatch<A extends Action = AnyAction> = (action: A) => void;
