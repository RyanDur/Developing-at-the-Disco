import {NewUser} from '../../types/user';
import {Handlers} from './Handlers';

export type Create = (user: NewUser, handle: Handlers) => void;
