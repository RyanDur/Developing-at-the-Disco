import {UserId} from '../../types/user';
import {Handler} from './Handler';

export type GetAll = (exclude: UserId, handle: Handler) => void;
