import {endpoint} from '../../../../config';

type SuccessHandler<T> = (message: T) => void;

const post = (message: any): RequestInit => ({
  method: 'POST',
  body: JSON.stringify(message),
  mode: 'cors',
  headers: {'Content-Type': 'application/json'}
});

export type Create = <T>(message: any, onSuccess: SuccessHandler<T>) => void;

export const create: Create = (message, onSuccess) =>
  void fetch(endpoint.users, post(message))
  .then(async (response: Response) => {
    onSuccess(await response.json());
  }).catch((er) => {
    console.log('error: ' + er);
  });
