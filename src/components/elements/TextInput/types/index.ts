import {ReactNode} from 'react';

export interface TextInputProps {
  onChange: (text: string) => void;
  className: string;
  children: ReactNode;
}

export interface TextInputState {
  text: string;
  isCandidate: boolean;
}
