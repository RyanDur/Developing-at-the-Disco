import * as React from 'react';
import {FormEvent, useState} from 'react';
import {SignupProps, Validation} from './types';
import {maxUsernameLength} from '../../../config';
import {TextInput} from '../../elements';
import {empty} from '../../util/helpers';
import './Signup.css';

const signupText: Record<string, string> = {
  USERNAME_EXISTS: 'Username already exists.'
};

export const Signup = ({createUser, userNameErrors = {}}: SignupProps) => {
  const [name, updateName] = useState('');

  const createNewUser = (event: FormEvent) => {
    event.preventDefault();
    name && createUser(name);
  };

  const translate = ({value, validations = []}: Partial<Validation>): Validation => {
    return {value, validations: validations.map(validation => signupText[validation])};
  };

  return <form id='create-user' onSubmit={createNewUser}>
    <TextInput className='username'
               placeHolder='Username'
               onChange={updateName}
               errors={translate(userNameErrors)}
               maxLength={maxUsernameLength}/>
    <button type='submit'
            className='submit primary'
            disabled={empty(name) || name === userNameErrors.value}>
      Enter
    </button>
  </form>;
};
