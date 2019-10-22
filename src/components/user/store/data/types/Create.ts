import {Username} from '../../types/user';
import {Handler} from './Handler';

export type Create = (name: Username, handle: Handler) => void;
