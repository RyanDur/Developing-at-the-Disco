import * as React from 'react';
import {ChangeEvent, ReactNode, useState} from 'react';
import {classes} from '../../util/helpers';
import './TextInput.css';

interface TextInputProps {
  onChange: (text: string) => void;
  className: string;
  children: ReactNode;
}

interface TextInputState {
  text: string;
  isCandidate: boolean;
}

export const TextInput = ({onChange, className, children}: TextInputProps) => {
  const [{text, isCandidate}, updateText] = useState<TextInputState>({
    text: '',
    isCandidate: false
  });

  const updateValue = ({target}: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
    updateText({isCandidate, text: target.value});
  };

  const setCandidate = () => updateText({text, isCandidate: true});

  const checkCandidate = () => updateText({text, isCandidate: !!text});

  const candidate = () => isCandidate ? 'candidate' : undefined;

  return <>
    <label className={classes('text-label', candidate())} htmlFor={`create-${className}`}>
      {children}
    </label>
    <input type='text'
           id={`create-${className}`}
           className={classes('text', className)}
           value={text}
           onChange={updateValue}
           onFocus={setCandidate}
           onBlur={checkCandidate}/>
  </>;
};
