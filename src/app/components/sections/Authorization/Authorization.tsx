import * as React from 'react';
import {Signup} from '../../user';
import {join} from '../../../../lib/util/helpers';
import {useSelector} from '../../../../lib/react-redux';
import {isAuthorizationDone} from '../../../store/user/selector';
import './Authorization.css';

export const Authorization = () => {
  const authorizationIsDone = useSelector(isAuthorizationDone);

  return <main id='content'>
    <Signup className={join('authorization', authorizationIsDone && 'remove')}/>
  </main>;
};
