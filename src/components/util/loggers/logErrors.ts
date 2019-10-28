import {PathReporter} from 'io-ts/lib/PathReporter';
import {Errors} from 'io-ts';
import {Either, left} from 'fp-ts/lib/Either';

export const logErrors = <T>(response: Either<Errors, T>): void => {
  return console.warn('Response failure', PathReporter.report(response));
};
