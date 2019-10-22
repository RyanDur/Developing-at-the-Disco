import {SuccessHandler} from './SuccessHandler';
import {ClientErrorHandler} from './ClientErrorHandler';

export interface Handler<T = any> {
  success: SuccessHandler<T>;
  clientError?: ClientErrorHandler<any>;
}
