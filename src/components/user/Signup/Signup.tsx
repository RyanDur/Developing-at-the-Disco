import * as React from 'react';
import {FormEvent, useState} from 'react';
import {SignupProps, Validation} from './types';
import {maxUsernameLength} from '../../../config';
import {TextInput} from '../../elements';
import {empty, not} from '../../util/helpers';
import './Signup.css';

const signupText: Record<string, string> = {
  USERNAME_EXISTS: 'Username already exists.'
};

interface LocalProps {
  onSceneEnd?: () => void;
  onAnimationEnd?: () => void;
  className?: string;
}

export const Signup =
  ({
     createUser,
     className,
     userNameErrors = {},
     onSceneEnd = () => undefined,
     onAnimationEnd = () => undefined
   }: SignupProps & LocalProps) => {
    const [name, updateName] = useState('');
    const [submitted, isSubmitted] = useState(false);
    const createNewUser = (event: FormEvent) => {
      event.preventDefault();
      if (not(disabled)) {
        createUser(name);
        isSubmitted(true);
      }
    };
    const translate = ({value, validations = []}: Partial<Validation>): Validation => ({
      value,
      validations: validations.map(validation => signupText[validation])
    });
    const invalid = empty(name) || name === userNameErrors.value;
    const disabled = invalid || submitted;
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
        Enter
      </button>
    </form>;
  };
