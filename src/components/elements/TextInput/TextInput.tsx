import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {TextInputProps, TextInputState} from './types';
import {classes, has} from '../../util/helpers';
import {MessageList} from '../List';
import './TextInput.css';

export const TextInput = ({onChange, className, maxLength, placeHolder, errors}: TextInputProps) => {
  const [{text, isCandidate}, updateText] = useState<TextInputState>({
    text: '',
    isCandidate: false
  });

  useEffect(() => onChange(text));

  const updateValue = ({target}: ChangeEvent<HTMLInputElement>) =>
    updateText({isCandidate, text: target.value});

  const setCandidate = () => updateText({text, isCandidate: true});

  const checkCandidate = () => updateText({text, isCandidate: has(text)});

  return <article className={classes(
    'text-input',
    (isCandidate && 'candidate'),
    className,
    (errors && 'invalid')
  )}>
    <label className='title'
           htmlFor={`create-${className}`}>{placeHolder}</label>
    <input type='text'
           id={`create-${className}`}
           className='text'
           value={text}
           onChange={updateValue}
           onFocus={setCandidate}
           onBlur={checkCandidate}
           maxLength={maxLength}/>
    <label className='max-length'
           htmlFor={`create-${className}`}>{`${text.length}/${maxLength}`}</label>
    {has(errors) && <MessageList className='errors' messages={errors}/>}
  </article>;
};
