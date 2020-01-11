import {UserId} from '../../types/user';
import {Handlers} from './Handlers';

export type GetAll = (exclude: UserId, handle: Handlers) => void;
