import {Validation} from '../../../../store/user/types';
import {DetailedHTMLProps, InputHTMLAttributes} from 'react';

export interface FancyInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  placeHolder: string;
  errors?: Partial<Validation>;
}
