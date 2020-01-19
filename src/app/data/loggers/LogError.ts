import {PathReporter} from 'io-ts/lib/PathReporter';
import {left} from 'fp-ts/lib/Either';
import {Errors} from 'io-ts';

export const logError = (error: Errors) =>
  console.warn(PathReporter.report(left(error)));
