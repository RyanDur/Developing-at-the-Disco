import {PathReporter} from 'io-ts/lib/PathReporter';
import {Errors} from 'io-ts';
import {left} from 'fp-ts/lib/Either';

export const logErrors = <T>(response: Errors): void =>
  console.warn('Response failure', PathReporter.report(left(response)));
