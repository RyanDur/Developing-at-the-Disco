import {PathReporter} from 'io-ts/lib/PathReporter';
import {Either, isRight} from 'fp-ts/lib/Either';
import {not} from '../helpers';
import {Errors} from 'io-ts';

export const logInvalid = <T>(response: Either<Errors, T>): Either<Errors, T> => {
  if (not(isRight(response))) {
    console.warn('Response failure', PathReporter.report(response));
  }
  return response;
};
