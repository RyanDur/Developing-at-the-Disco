import {UserId} from '../../store/user/types/user';
import {Handlers} from '../../store/user/types';

export type GetAll = (exclude: UserId, handle: Handlers) => void;
