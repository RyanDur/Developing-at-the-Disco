import {Handlers, HttpRequest, ResponseTypeGuards} from './types';
import {host} from '../../../../config';
import {logError, logResponse} from '../../../loggers';
import {fold} from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/lib/pipeable';

export const http = (
  {
    path,
    request
  }: HttpRequest,
  {
    onSuccess,
    onClientError = logError
  }: Handlers,
  {
    success,
    clientError
  }: ResponseTypeGuards
): void => void fetch(`${host + path}`, request)
  .then(async (response: Response) => {
    const body = await response.json();
    switch (response.status) {
      case 200:
      case 201:
        return pipe(success.decode(body), fold(logError, onSuccess));
      case 400:
        return pipe(clientError.decode(body), fold(logError, onClientError));
      default:
        logResponse(body);
    }
  }).catch(logError);
