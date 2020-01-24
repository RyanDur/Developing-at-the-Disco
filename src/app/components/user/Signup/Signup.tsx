import * as React from 'react';
import {DetailedHTMLProps, FormEvent, HTMLAttributes, useState} from 'react';
import {maxUsernameLength} from '../../../../config';
import {FancyInput} from '../../elements';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {empty, not} from '../../../../lib/util/helpers';
import {create} from '../../../store/user/action';
import {Validation} from '../../../store/user/types';
import {usernameErrors} from '../../../store/user/selector';

// import './Signup.css';

interface ViewText {
  [K: string]: string;
}

const SignupText: ViewText = {
  USERNAME_EXISTS: 'Username already exists.'
};

export const translate = (validation: Validation = ({} as Validation), viewText: ViewText): Validation => {
  return validation.value ? {
    ...validation,
    validations: validation.validations.map(key => viewText[key])
  } : validation;
};

interface SignupProps {
  onSceneEnd?: () => void;
}

export const Signup = ({onSceneEnd, ...props}: SignupProps & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLFormElement>) => {
  const invalidUsername = translate(useSelector(usernameErrors), SignupText);
  const [name, updateName] = useState('');
  const [submitted, isSubmitted] = useState(false);
  const dispatch = useDispatch();
  const disabled = empty(name) || name === invalidUsername.value || submitted;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (not(disabled)) {
      dispatch(create(name));
      isSubmitted(true);
    }
  };

  return <form {...props} onSubmit={handleSubmit}>
    <FancyInput className='username'
                type='text'
                placeHolder='Username'
                onChange={event => updateName(event.target.value)}
                errors={invalidUsername}
                maxLength={maxUsernameLength}/>
    {/*<button type='submit'*/}
    {/*        className='submit primary'*/}
    {/*        onTransitionEnd={() => onSceneEnd()}*/}
    {/*        disabled={disabled}>*/}
    {/*  Sign Up*/}
    {/*</button>*/}
  </form>;
};
