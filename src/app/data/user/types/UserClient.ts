import {GetAll} from './GetAll';
import {Create} from './Create';

export interface UserClient {
  create: Create;

  getAll: GetAll;
}
