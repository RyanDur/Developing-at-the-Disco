import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {currentUser, usernameErrors} from '../../../store/user/selector';
import {empty, has, not} from '../../../../lib/util/helpers';
import {Path} from '../../index';
import {Redirect} from 'react-router-dom';
import './Authorization.css';
import {createNewUser} from '../../../store/user/action';
import {FancyInput} from '../../elements/FancyInput';
import {SignupText, translate} from '../../translator';
import {maxUsernameLength} from '../../../../config';

export const Authorization = () => {
  const dispatch = useDispatch();
  const authorized = has(useSelector(currentUser));
  const invalidUsername = useSelector(usernameErrors);
  const [name, updateName] = useState('');
  const [password, updatePassword] = useState('');
  const [submitted, isSubmitted] = useState(false);

  const invalid = empty(name) || empty(password) || name === (invalidUsername || {}).value;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (not(invalid)) {
      dispatch(createNewUser(name, password));
      isSubmitted(true);
    }
  };

  useEffect(() => {
    isSubmitted(not(invalid));
  }, [invalidUsername]);

  return authorized ? <Redirect to={Path.HOME}/> : <main id='content'>
    <form id='create-user' className='authorization fan' onSubmit={handleSubmit}>
      <FancyInput id='username'
                  autoFocus={true}
                  className='guard top'
                  type='text'
                  placeHolder='Username'
                  onChange={event => updateName(event.target.value)}
                  errors={translate(invalidUsername, SignupText)}
                  maxLength={maxUsernameLength}/>
      <FancyInput id='password'
                  type='password'
                  className='stick'
                  placeHolder='Password'
                  onChange={event => updatePassword(event.target.value)}
                  maxLength={maxUsernameLength}/>
      <button type='submit'
              className={'primary guard bottom'}
              disabled={invalid || submitted}>
        Sign Up
      </button>
    </form>
  </main>;
};
