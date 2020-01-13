import * as React from 'react';
import {FormEvent, useState} from 'react';
import {maxUsernameLength} from '../../../../config';
import {TextInput} from '../../elements';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {empty, not} from '../../../../lib/util/helpers';
import {selectUsernameErrors} from '../../../store/selector';
import {create} from '../../../store/user/action';
import {Validation} from '../../../store/user/types';
import {SignupProps} from './types';
import './Signup.css';

const signupText: Record<string, string> = {
  USERNAME_EXISTS: 'Username already exists.'
};

export const translate = ({value, validations = []}: Validation): Validation => ({
  value,
  validations: validations.map(validation => signupText[validation])
});

export const Signup = ({
  className,
  onSceneEnd = () => undefined,
  onAnimationEnd = () => undefined
}: SignupProps) => {
  const userNameErrors = useSelector(selectUsernameErrors) || {};
  const dispatch = useDispatch();
  const [name, updateName] = useState('');
  const [submitted, isSubmitted] = useState(false);

  const invalid = empty(name) || name === userNameErrors.value;
  const disabled = invalid || submitted;

  const createNewUser = (event: FormEvent) => {
    event.preventDefault();
    if (not(disabled)) {
      dispatch(create(name));
      isSubmitted(true);
    }
  };

  const onTransitionEnd = () => {
    if (submitted && not(invalid)) {
      onSceneEnd();
    } else {
      isSubmitted(false);
    }
  };

  return <form id='create-user'
               onSubmit={createNewUser}
               className={className}
               onAnimationEnd={onAnimationEnd}>
    <TextInput className='username'
               placeHolder='Username'
               onChange={updateName}
               errors={translate(userNameErrors)}
               maxLength={maxUsernameLength}/>
    <button type='submit'
            className='submit primary'
            onTransitionEnd={onTransitionEnd}
            disabled={disabled}>
      Sign Up
    </button>
  </form>;
};
