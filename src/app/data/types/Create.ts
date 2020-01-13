import {Handlers, NewUser} from '../../store/user/types';

export type Create = (user: NewUser, handle: Handlers) => void;
