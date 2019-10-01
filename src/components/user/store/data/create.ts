import {endpoint} from '../../../../config';

type SuccessHandler<T> = (message: T) => void;

type Method = RequestInit;

const post = (message: any): RequestInit => ({
  method: 'POST',
  body: JSON.stringify(message),
  mode: 'cors',
  headers: {'Content-Type': 'application/json'}
});

const http = <T>(method: Method, url: string, onSuccess: SuccessHandler<T>): void =>
  void fetch(url, method)
  .then(async (response: Response) => {
    onSuccess(await response.json());
  }).catch((er) => {
    console.error('error: ' + er);
  });

export type Create = <T>(message: any, onSuccess: SuccessHandler<T>) => void;

export const createUser: Create = (user, onSuccess) =>
  http(post(user), endpoint.users, onSuccess);
