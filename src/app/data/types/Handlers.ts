import {Handler} from './Handler';

export interface Handlers<T = any> {
  onSuccess: Handler<T>;
  onClientError?: Handler<any>;
}
