import * as React from 'react';
import {useEffect, useState} from 'react';
import {TextInputProps} from './types';
import {MessageList} from '../List';
import './TextInput.css';
import {join, has} from '../../../../lib/util/helpers';

export const TextInput = ({onChange, className, maxLength, placeHolder, errors = {}}: TextInputProps) => {
  const [text, updateText] = useState('');
  const [isCandidate, updateCandidate] = useState(false);

  useEffect(() => onChange(text));

  return <article className={join(
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
