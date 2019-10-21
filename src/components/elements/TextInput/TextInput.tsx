import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {TextInputProps} from './types';
import {classes, has} from '../../util/helpers';
import {MessageList} from '../List';
import './TextInput.css';

export const TextInput = ({onChange, className, maxLength, placeHolder, errors = {}}: TextInputProps) => {
  const [text, updateText] = useState('');
  const [isCandidate, updateCandidate] = useState(false);

  useEffect(() => onChange(text));

  return <article className={classes(
    'text-input',
    (isCandidate && 'candidate'),
    className,
    (errors.value === text && 'invalid')
  )}>
    <label className='title'
           htmlFor={`create-${className}`}>{placeHolder}</label>
    <input type='text'
           id={`create-${className}`}
           className='text'
           value={text}
           onChange={(event) => updateText(event.target.value)}
           onFocus={() => updateCandidate(true)}
           onBlur={() => updateCandidate(has(text))}
           maxLength={maxLength}/>
    <label className='max-length'
           htmlFor={`create-${className}`}>{`${text.length}/${maxLength}`}</label>
    {errors.value === text && <MessageList className='errors' messages={errors.validations}/>}
  </article>;
};
