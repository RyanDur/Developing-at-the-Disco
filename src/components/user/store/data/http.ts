import {Handlers, Method, ResponseTypeGuards} from './types';
import {Endpoint} from './types/Endpoint';
import {host} from '../../../../config';
import {logError, logResponse} from '../../../loggers';
import {isRight} from 'fp-ts/lib/Either';

export const http = (
  method: Method,
  endpoint: Endpoint,
  {
    onSuccess,
    onClientError = logError
  }: Handlers,
  guard: ResponseTypeGuards
): void => void fetch(`${host + endpoint}`, method)
  .then(async (response: Response) => {
    const body = await response.json();
    switch (response.status) {
      case 200:
      case 201: {
        const decoded = guard.success.decode(body);
        return isRight(decoded) ? onSuccess(decoded.right) : logError(decoded);
      }
      case 400: {
        const decoded = guard.clientError.decode(body);
        return isRight(decoded) ? onClientError(decoded.right) : logError(decoded);
      }
      default:
        logResponse(body);
    }
  }).catch(logError);
