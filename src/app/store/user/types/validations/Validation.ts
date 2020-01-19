import * as t from 'io-ts';
import {ValidationType} from '../../../../data/user/guard';

export type Validation = t.TypeOf<typeof ValidationType>;
