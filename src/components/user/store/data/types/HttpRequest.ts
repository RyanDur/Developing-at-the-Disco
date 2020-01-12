import {Method} from './Method';

export interface HttpRequest {
  path: string;
  request: Method;
}
