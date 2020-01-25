import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import {maxUsernameLength} from '../../../../config';
import {FancyInput} from '../../elements';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {classes, empty, not} from '../../../../lib/util/helpers';
import {usernameErrors} from '../../../store/user/selector';
import {SignupText, translate} from '../../translator';
import './AuthForm.css';
import {create} from '../../../store/user/action';

interface SignupProps {
  id?: string;
  className?: string;
  onSceneEnd?: () => void;
  onAnimationEnd?: () => void;
}

export const AuthForm = ({
  id,
  className,
  onSceneEnd = () => undefined,
  onAnimationEnd = () => undefined
}: SignupProps) => {
  const dispatch = useDispatch();
  const invalidUsername = useSelector(usernameErrors);
  const [name, updateName] = useState('');
  const [submitted, isSubmitted] = useState(false);
  const invalid = empty(name) || name === (invalidUsername || {}).value;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (not(invalid)) {
      dispatch(create(name));
      isSubmitted(true);
    }
  };

  useEffect(() => {
    isSubmitted(not(invalid));
  }, [invalidUsername]);

  return <form id={id}
               className={classes(className, 'accordion')}
               onAnimationEnd={onAnimationEnd}
               onSubmit={handleSubmit}>
    <FancyInput id='username'
                className='bellow'
                type='text'
                placeHolder='Username'
                onChange={event => {
                  updateName(event.target.value);
                }}
                errors={translate(invalidUsername, SignupText)}
                maxLength={maxUsernameLength}/>
    <button type='submit'
            className='submit primary'
            onTransitionEnd={() => submitted && onSceneEnd()}
            disabled={invalid || submitted}>
      Sign Up
    </button>
  </form>;
};
