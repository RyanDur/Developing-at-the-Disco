import * as React from 'react';
import {DetailedHTMLProps, FormEvent, HTMLAttributes, useEffect, useState} from 'react';
import {maxUsernameLength} from '../../../../config';
import {TextInput} from '../../elements';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {empty, not} from '../../../../lib/util/helpers';
import {create} from '../../../store/user/action';
import {Validation} from '../../../store/user/types';
import {currentUser, usernameErrors} from '../../../store/user/selector';
import './Signup.css';

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

interface SignupProps {
  onSceneEnd?: () => void;
}

export const Signup = ({onSceneEnd, ...props}: SignupProps & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLFormElement>) => {
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

  return <form {...props} onSubmit={handleSubmit}>
    <TextInput className='username'
               placeHolder='Username'
               onChange={updateName}
               errors={translate(invalidUsername, SignupText)}
               maxLength={maxUsernameLength}/>
    <button type='submit'
            className='submit primary'
            onTransitionEnd={() => onSceneEnd()}
            disabled={disabled}>
      Sign Up
    </button>
  </form>;
};
