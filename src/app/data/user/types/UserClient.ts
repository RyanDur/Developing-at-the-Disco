import {NewUser, UserId} from '../../../store/user/types/user';
import {ResponseHandler} from '../../../store/user/types';

export interface UserClient {
  create: (user: NewUser, handle: ResponseHandler) => void;

  getAll: (exclude: UserId, handle: ResponseHandler) => void;

  logout: (id: string, handle: ResponseHandler) => void;
}
