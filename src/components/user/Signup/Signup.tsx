import * as React from 'react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {SignupProps} from './types';
import './Signup.css';

interface SignupState {
  name: string;
  isCandidate: boolean;
}

export const Signup = ({createUser}: SignupProps) => {
  const [value, setValue] = useState<SignupState>({
    name: '',
    isCandidate: false
  });

  const createNewUser = (event: FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    createUser(value.name);
  };

  const setName = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, name: event.target.value});
  };

  const setFocus = () => {
    setValue({...value, isCandidate: true});
  };

  const setBlur = () => {
    setValue({...value, isCandidate: !!value.name});
  };

  return <form id='create-user' onSubmit={createNewUser}>
    <input type='text'
           id='create-user-name'
           className='name'
           value={value.name}
           onChange={setName}
           onFocus={setFocus}
           onBlur={setBlur}/>
    <label className={'name-label' + (value.isCandidate ? ' candidate' : '')}
           htmlFor='create-user-name'>Username</label>
    <button type='submit' className='submit primary'>Enter</button>
  </form>;
};
