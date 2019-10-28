import {NewUser} from '../../types/user';
import {Handler} from './Handler';

export type Create = (user: NewUser, handle: Handler) => void;
