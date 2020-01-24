import {Params} from './types';
import {HttpRequest} from '../types';
import {has} from '../../../lib/util/helpers';

const createParams = (params: Params = {}) =>
  Object.keys(params)
    .map(param => `${param}=${params[param]}`)
    .join('&');

const createPath = (endpoint: string[], params?: string) =>
  [endpoint.join('/'), params]
    .filter(has)
    .join('?');

const info = {
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json'
  }
};

export const get = (params: Params, ...endpoint: string[]): HttpRequest => ({
  path: createPath(endpoint, createParams(params)),
  request: {
    ...info,
    method: 'GET'
  }
});

export const post = (body: any, ...endpoint: string[]): HttpRequest => ({
  path: createPath(endpoint),
  request: {
    ...info,
    method: 'POST',
    body: JSON.stringify(body)
  }
});

export const patch = (body: any, ...endpoint: string[]): HttpRequest => ({
  path: createPath(endpoint),
  request: {
    ...info,
    method: 'PATCH',
    body: JSON.stringify(body)
  }
});
