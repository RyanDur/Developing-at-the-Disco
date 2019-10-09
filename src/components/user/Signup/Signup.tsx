import * as React from 'react';
import {FormEvent, useState} from 'react';
import {SignupProps} from './types';
import {maxUsernameLength} from '../../../config';
import {TextInput} from '../../elements';
import './Signup.css';

export const Signup = ({createUser}: SignupProps) => {
  const [name, updateName] = useState('');

  const createNewUser = (event: FormEvent) => {
    event.preventDefault();
    name && createUser(name);
  };

  return <form id='create-user' onSubmit={createNewUser}>
    <TextInput className='name' onChange={updateName} maxLength={maxUsernameLength}>
      Username
    </TextInput>
    <button type='submit' className='submit primary' disabled={!name}>
      Enter
    </button>
  </form>;
};
