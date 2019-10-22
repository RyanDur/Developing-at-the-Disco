import {host} from '../../../../config';
import {Handler, Method, ResponseTypeGuards} from './types';
import {Endpoint} from './types/Endpoint';
import {logError, logResponse} from '../../../util/loggers';

export const http = (
  method: Method,
  endpoint: Endpoint,
  {clientError = logResponse, success}: Handler,
  guard: ResponseTypeGuards
): void => void fetch(`${host + endpoint}`, method)
  .then(async (response: Response): Promise<void> => {
    const body = await response.json();
    switch (response.status) {
    case 200:
    case 201:
      return success(guard.success.decode(body));
    case 400:
      return clientError(guard.clientError.decode(body));
    default:
      logResponse(body);
    }
  }).catch(logError);
