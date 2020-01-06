import {PathReporter} from 'io-ts/lib/PathReporter';
import {Errors} from 'io-ts';
import {Either} from 'fp-ts/lib/Either';

export const logErrors = <T>(response: Either<Errors, T>): void =>
  console.warn('Response failure', PathReporter.report(response));
