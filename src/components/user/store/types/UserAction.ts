import {CreateAction} from './CreateAction';
import {UpdateAction} from './UpdateAction';
import {CurrentAction} from './CurrentAction';

export type UserAction = CreateAction | UpdateAction | CurrentAction;
