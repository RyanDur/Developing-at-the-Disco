import * as React from 'react';
import {FormEvent, useState} from 'react';
import {maxUsernameLength} from '../../../../config';
import {TextInput} from '../../elements';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {empty, not} from '../../../../lib/util/helpers';
import {create} from '../../../store/user/action';
import {Validation} from '../../../store/user/types';
import {SignupProps} from './types';
import {currentUser, usernameErrors} from '../../../store/user/selector';
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import './Signup.css';
import {Path} from '../../index';

const signupText: Record<string, string> = {
  USERNAME_EXISTS: 'Username already exists.'
};

export const translate = ({value, validations = []}: Validation): Validation => ({
  value,
  validations: validations.map(validation => signupText[validation])
});

export const Signup = withRouter(({
                                    className,
                                    onSceneEnd = () => undefined,
                                    onAnimationEnd = () => undefined,
                                    history
                                  }: SignupProps & RouteComponentProps) => {
  const userNameErrors = useSelector(usernameErrors) || {};
  const dispatch = useDispatch();
  const [name, updateName] = useState('');
  const [submitted, isSubmitted] = useState(false);

  const invalid = empty(name) || name === userNameErrors.value;
  const disabled = invalid || submitted;

  const createNewUser = (event: FormEvent) => {
    event.preventDefault();
    if (not(disabled)) {
      isSubmitted(true);
      dispatch(create(name));
      history.push(Path.HOME);
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
});
