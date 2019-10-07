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
    event.preventDefault();
    createUser(value.name);
  };

  const setName = (event: ChangeEvent<HTMLInputElement>) =>
    setValue({...value, name: event.target.value});

  const setCandidate = () =>
    setValue({...value, isCandidate: true});

  const checkCandidate = () =>
    setValue({...value, isCandidate: !!value.name});

  const candidate = () => {
    if (value.isCandidate) return ' candidate';
  };

  const classes = (...list: string[]) =>
    list.filter(name => !!name).join(' ');

  return <form id='create-user' onSubmit={createNewUser}>
    <label className={classes('name-label', candidate())}
           htmlFor='create-user-name'>Username</label>
    <input type='text'
           id='create-user-name'
           className='name'
           value={value.name}
           onChange={setName}
           onFocus={setCandidate}
           onBlur={checkCandidate}/>
    <button type='submit' className='submit primary'>Enter</button>
  </form>;
};
