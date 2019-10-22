import {Either} from 'fp-ts/lib/Either';
import {Errors} from 'io-ts';

export type ClientErrorHandler<T> = (body: Either<Errors, T>) => void;
