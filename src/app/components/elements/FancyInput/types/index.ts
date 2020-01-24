import {Validation} from '../../../../store/user/types';

export interface TextInputProps {
  placeHolder: string;
  errors?: Partial<Validation>;
}
