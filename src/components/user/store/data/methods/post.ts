import {Method} from '../types';

export const post = (message: any): Method => ({
  method: 'POST',
  body: JSON.stringify(message),
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
