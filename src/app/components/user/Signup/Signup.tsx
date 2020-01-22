import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {maxUsernameLength} from '../../../../config';
import {TextInput} from '../../elements';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {empty, has, not} from '../../../../lib/util/helpers';
import {create, pageDone} from '../../../store/user/action';
import {Validation} from '../../../store/user/types';
import {SignupProps} from './types';
import {currentUser, usernameErrors} from '../../../store/user/selector';
import './Signup.css';
import {Page} from '../../../store/user/action/types';

interface ViewText {
  [K: string]: string;
}

const SignupText: ViewText = {
  USERNAME_EXISTS: 'Username already exists.'
};

export const translate = ({value, validations = []}: Validation, text: ViewText): Validation => ({
  value,
  validations: validations.map(validation => text[validation])
});

export const Signup = ({
  className
}: SignupProps) => {
  const user = useSelector(currentUser);
  const invalidUsername = useSelector(usernameErrors) || {};
  const dispatch = useDispatch();
  const [name, updateName] = useState('');
  const [submitted, isSubmitted] = useState(false);

  const invalid = empty(name) || name === invalidUsername.value;
  const disabled = invalid || submitted;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (not(disabled)) {
      dispatch(create(name));
      isSubmitted(true);
    }
  };

  useEffect(() => {
    if (empty(user)) isSubmitted(false);
  });

  return <form id='create-user'
               onSubmit={handleSubmit}
               className={className}>
    <TextInput className='username'
               placeHolder='Username'
               onChange={updateName}
               errors={translate(invalidUsername, SignupText)}
               maxLength={maxUsernameLength}/>
    <button type='submit'
            className='submit primary'
            onTransitionEnd={() => {
              if (has(user)) dispatch(pageDone(Page.SIGNUP));
            }}
            disabled={disabled}>
      Sign Up
    </button>
  </form>;
};
