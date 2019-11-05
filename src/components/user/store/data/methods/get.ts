import {Method} from '../types';
import {base} from './base';

export const get = (): Method => ({
  ...base,
  method: 'Get'
});
