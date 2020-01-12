import {HttpRequest} from '../types';
import {base} from './base';
import {notEmpty} from '../../../../../lib/util/helpers';

interface Params {
  [param: string]: any;
}

const createParams = (params: Params = {}) =>
  Object.keys(params)
    .map(param => `${param}=${params[param]}`)
    .join('&');

const createPath = (endpoint: string, params: Params) =>
  [endpoint, createParams(params)]
    .filter(notEmpty)
    .join('?');

export const get = (endpoint: string, params?: Params): HttpRequest => ({
  path: createPath(endpoint, params),
  request: {
    ...base,
    method: 'Get'
  }
});
