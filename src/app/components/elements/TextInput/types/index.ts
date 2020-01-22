import {Validation} from '../../../../store/user/types';

export interface TextInputProps {
  onChange: (text: string) => void;
  className: string;
  maxLength: number;
  placeHolder: string;
  errors?: Partial<Validation>;
}
