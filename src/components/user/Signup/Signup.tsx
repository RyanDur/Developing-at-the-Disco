import * as React from 'react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {SignupProps, SignupState} from './types';
import {classes} from '../../util/helpers';
import './Signup.css';

export const Signup = ({createUser}: SignupProps) => {
  const [{name, isCandidate}, setValue] = useState<SignupState>({
    name: '',
    isCandidate: false
  });

  const createNewUser = (event: FormEvent) => {
    event.preventDefault();
    name && createUser(name);
  };

  const setName = ({target}: ChangeEvent<HTMLInputElement>) =>
    setValue({isCandidate, name: target.value});

  const setCandidate = () => setValue({name, isCandidate: true});

  const checkCandidate = () => setValue({name, isCandidate: !!name});

  const candidate = () => isCandidate ? 'candidate' : undefined;

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
