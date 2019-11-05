import {Method} from '../types';
import {base} from './base';

export const post = (message: any): Method => ({
  ...base,
  method: 'POST',
  body: JSON.stringify(message)
});
