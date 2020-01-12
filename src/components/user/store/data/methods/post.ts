import {base} from './base';
import {HttpRequest} from '../types';

export const post = (body: any, endpoint: string): HttpRequest => ({
  path: endpoint,
  request: {
    ...base,
    method: 'POST',
    body: JSON.stringify(body)
  }
});
