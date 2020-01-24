import * as React from 'react';
import {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import {TextInputProps} from './types';
import {MessageList} from '../List';
import './FancyInput.css';
import {has, classes, not} from '../../../../lib/util/helpers';

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
}: TextInputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  const [value, updateValue] = useState('');
  const [candidate, updateCandidate] = useState(false);
  const invalid = errors.value === value;
  const behaviors = classes(candidate && 'candidate', invalid && 'invalid');

  return <>
    <label className={classes('title', behaviors)} htmlFor={id}>{placeHolder}</label>
    <input {...props}
           id={id}
           className={classes('fancy-input', className, behaviors)}
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
    <label className={classes('max-length', behaviors)}
           htmlFor={id}>{`${String(value).length}/${maxLength}`}</label>
    <MessageList className={classes('errors', not(invalid) && 'leave')}
                          messages={errors.validations}/>
  </>;
};
