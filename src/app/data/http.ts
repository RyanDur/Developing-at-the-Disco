import {HttpRequest, ResponseTypeGuards} from './types';
import {fold} from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/lib/pipeable';
import {host} from '../../config';
import {logError, logResponse} from './loggers';
import {ResponseHandler} from '../store/user/types';
import * as t from 'io-ts';

const NO_CONTENT = t.record(t.string, t.undefined);

export const http = (
  {
    path,
    request
  }: HttpRequest,
  {
    onSuccess,
    onClientError = logResponse
  }: ResponseHandler,
  {
    success,
    clientError
  }: ResponseTypeGuards = {success: NO_CONTENT}
): void => void fetch(`${host + path}`, request)
  .then(async (response: Response) => {
    const body = await response.json();
    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return pipe(success.decode(body), fold(logError, onSuccess));
      case 400:
        return pipe(clientError.decode(body), fold(logError, onClientError));
      default:
        logResponse(body);
    }
  }).catch(logResponse);
