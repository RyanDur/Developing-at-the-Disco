import * as React from 'react';
import {AuthForm} from '../../user';
import {useSelector} from '../../../../lib/react-redux';
import {currentUser} from '../../../store/user/selector';
import {classes, has} from '../../../../lib/util/helpers';
import {Path} from '../../index';
import {Redirect} from 'react-router-dom';
import './Authorization.css';

export const Authorization = () => {
  const authorized = has(useSelector(currentUser));
  return authorized ? <Redirect to={Path.HOME}/> : <main id='content'>
    <AuthForm id='create-user' className={classes('authorization')}/>
  </main>;
};
