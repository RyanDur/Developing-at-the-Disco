import {Method} from '../types';

export const get = (): Method => ({
  method: 'Get',
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
