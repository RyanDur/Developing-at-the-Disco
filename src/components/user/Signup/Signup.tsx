import * as React from 'react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {SignupProps} from './types';
import './Signup.css';

interface SignupState {
  name: string;
  isCandidate: boolean;
}

export const Signup = ({createUser}: SignupProps) => {
  const [{name, isCandidate}, setValue] = useState<SignupState>({
    name: '',
    isCandidate: false
  });

  const createNewUser = (event: FormEvent) => {
    event.preventDefault();
    name && createUser(name);
  };

  const setName = (event: ChangeEvent<HTMLInputElement>) =>
    setValue({isCandidate, name: event.target.value});

  const setCandidate = () =>
    setValue({name, isCandidate: true});

  const checkCandidate = () =>
    setValue({name, isCandidate: !!name});

  const candidate = () => {
    if (isCandidate) return ' candidate';
  };

  const classes = (...list: string[]) =>
    list.filter(className => !!className).join(' ');

  return <form id='create-user' onSubmit={createNewUser}>
    <label className={classes('name-label', candidate())} htmlFor='create-user-name'>
      Username
    </label>
    <input type='text'
           id='create-user-name'
           className='name'
           value={name}
           onChange={setName}
           onFocus={setCandidate}
           onBlur={checkCandidate}/>
    <button type='submit' className='submit primary' disabled={!name}>
      Enter
    </button>
  </form>;
};
