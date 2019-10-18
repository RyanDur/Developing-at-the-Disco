import {endpoint} from '../../../../config';
import {Errors, Type} from 'io-ts';
import {Either} from 'fp-ts/lib/Either';
import {SignupValidationGuard} from '../../Signup/types/UsernameValidation';
import {CurrentUserGuard} from '../types/user/CurrentUser';

export type Handle<T = any> = (message: T) => void;
type SuccessHandler<T> = (body: Either<Errors, T>) => void;
type ClientErrorHandler<T> = (body: Either<Errors, T>) => void;

type Method = RequestInit;

const {host, users} = endpoint;

const post = (message: any): RequestInit => ({
  method: 'POST',
  body: JSON.stringify(message),
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const http = (method: Method, url: string, {
  clientError,
  success,
  successGuard: {decode: toSuccess},
  clientErrorGuard: {decode: toClientError}
}: Handler & ResponseTypeGuards): void => void fetch(`${host + url}`, method)
  .then(async (response: Response) => {
    const body = await response.json();
    if (response.status === 201) {
      success(toSuccess(body));
    } else if (response.status === 400) {
      clientError(toClientError(body));
    } else {
      console.warn('response:', body);
    }
  }).catch((er) => {
    console.error('error:', er);
  });

export interface Handler<T = any> {
  success: SuccessHandler<T>;
  clientError: ClientErrorHandler<any>;
}

interface ResponseTypeGuards {
  successGuard: Type<any>;
  clientErrorGuard: Type<any>;
}

export type Create = (message: any, handle: Handler) => void;

export const createUser: Create = (user, handle) =>
  http(post(user), users, {
    ...handle,
    successGuard: CurrentUserGuard,
    clientErrorGuard: SignupValidationGuard
  });
