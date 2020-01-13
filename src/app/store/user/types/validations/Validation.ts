import * as t from 'io-ts';
import {ValidationType} from '../../../../data/types';

export type Validation = t.TypeOf<typeof ValidationType>;
