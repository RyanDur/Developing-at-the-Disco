import {Params} from './types';
import {HttpRequest} from '../types';
import {notEmpty} from '../../../lib/util/helpers';

const createParams = (params: Params = {}) =>
  Object.keys(params)
    .map(param => `${param}=${params[param]}`)
    .join('&');

export const createPath = (endpoint: string, params: Params) =>
  [endpoint, createParams(params)]
    .filter(notEmpty)
    .join('?');

const info = {
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json'
  }
};

export const get = (endpoint: string, params?: Params): HttpRequest => ({
  path: createPath(endpoint, params),
  request: {
    ...info,
    method: 'GET'
  }
});

export const post = (body: any, endpoint: string): HttpRequest => ({
  path: endpoint,
  request: {
    ...info,
    method: 'POST',
    body: JSON.stringify(body)
  }
});
