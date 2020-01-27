import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {maxUsernameLength} from '../../../../config';
import {FancyInput} from '../../elements';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {classes, empty, not} from '../../../../lib/util/helpers';
import {usernameErrors} from '../../../store/user/selector';
import {SignupText, translate} from '../../translator';
import {createNewUser} from '../../../store/user/action';
import './AuthForm.css';

interface SignupProps {
  id?: string;
  className?: string;
  onSceneEnd?: () => void;
  onAnimationEnd?: () => void;
}

export const AuthForm = ({
  id,
  className,
  onAnimationEnd = () => undefined
}: SignupProps) => {
  const dispatch = useDispatch();
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

  return <form id={id}
               className={classes(className, 'fan')}
               onAnimationEnd={onAnimationEnd}
               onSubmit={handleSubmit}>
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
                className={classes('stick', 'unfolded')}
                placeHolder='Password'
                onChange={event => updatePassword(event.target.value)}
                maxLength={maxUsernameLength}/>
    <button type='submit'
            className={classes('primary guard bottom', 'unfolded')}
            disabled={invalid || submitted}>
      Sign Up
    </button>
  </form>;
};
