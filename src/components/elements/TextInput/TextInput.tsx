import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {TextInputProps, TextInputState} from './types';
import {classes} from '../../util/helpers';
import './TextInput.css';

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

  return <article className='text-input'>
    <label className={classes('text-label', (isCandidate && 'candidate'))}
           htmlFor={`create-${className}`}>{children}</label>
    <input type='text'
           id={`create-${className}`}
           className={classes('text', className)}
           value={text}
           onChange={updateValue}
           onFocus={setCandidate}
           onBlur={checkCandidate}/>
  </article>;
};
