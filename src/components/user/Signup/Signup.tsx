import * as React from 'react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {SignupProps} from './types';

export const Signup = ({createUser}: SignupProps) => {
  const [value, setValue] = useState<string>('');

  const createNewUser = (event: FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    createUser(value);
  };

  const setName = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return <form id='create-user' onSubmit={createNewUser}>
    <label>
      Name
      <input type='text'
             className='name'
             value={value}
             onChange={setName}/>
    </label>
    <button type='submit'>Submit</button>
  </form>;
};
