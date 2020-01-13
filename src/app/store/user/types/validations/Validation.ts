import * as t from 'io-ts';
import {ValidationType} from '../../../../data/user/types';

export type Validation = t.TypeOf<typeof ValidationType>;
