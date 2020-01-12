import {Handlers} from './Handlers';
import {UserId} from '../../store/user/types/user';

export type GetAll = (exclude: UserId, handle: Handlers) => void;
