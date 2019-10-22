import {Create} from './Create';
import {GetAll} from './GetAll';

export interface UserClient {
  create: Create;

  getAll: GetAll;
}
