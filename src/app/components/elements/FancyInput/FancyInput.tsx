import * as React from 'react';
import {useState} from 'react';
import {FancyInputProps} from './types';
import {MessageList} from '../List';
import {classes, has} from '../../../../lib/util/helpers';
import './FancyInput.css';

export const FancyInput = ({
  id,
  className,
  maxLength,
  placeHolder,
  onChange = () => undefined,
  onFocus = () => undefined,
  onBlur = () => undefined,
  errors = {},
  ...props
}: FancyInputProps) => {
  const [value, updateValue] = useState('');
  const [candidate, updateCandidate] = useState(false);
  const invalid = errors.value === value;

  return <article className={classes('fancy-input', className, candidate && 'candidate', invalid && 'invalid')}>
    <label className='title' htmlFor={id}>{placeHolder}</label>
    <input {...props}
           id={id}
           className='fancy'
           onChange={event => {
             updateValue(event.target.value);
             onChange(event);
           }}
           maxLength={maxLength}
           onFocus={event => {
             updateCandidate(true);
             onFocus(event);
           }}
           onBlur={event => {
             updateCandidate(has(value));
             onBlur(event);
           }}/>
    <label className='max-length'
           htmlFor={id}>{`${String(value).length}/${maxLength}`}</label>
    <MessageList className='errors' messages={errors.validations}/>
  </article>;
};
