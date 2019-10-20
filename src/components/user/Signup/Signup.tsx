import * as React from 'react';
import {FormEvent, useState} from 'react';
import {SignupProps} from './types';
import {maxUsernameLength} from '../../../config';
import {TextInput} from '../../elements';
import {empty, has} from '../../util/helpers';
import './Signup.css';

export const Signup = ({createUser, userNameErrors = {}}: SignupProps) => {
  const [name, updateName] = useState('');

  const createNewUser = (event: FormEvent) => {
    event.preventDefault();
    name && createUser(name);
  };

  return <form id='create-user' onSubmit={createNewUser}>
    <TextInput className='username'
               placeHolder='Username'
               onChange={updateName}
               errors={userNameErrors}
               maxLength={maxUsernameLength}/>
    <button type='submit'
            className='submit primary'
            disabled={empty(name) || name === userNameErrors.value}>
      Enter
    </button>
  </form>;
};
