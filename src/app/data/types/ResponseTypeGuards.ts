import {Type} from 'io-ts';

export interface ResponseTypeGuards {
  success: Type<any>;
  clientError?: Type<any>;
}
