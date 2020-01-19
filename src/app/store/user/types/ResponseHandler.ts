import {Handle} from './Handle';

export interface ResponseHandler<T = any> {
  onSuccess: Handle<T>;
  onClientError?: Handle<any>;
}
