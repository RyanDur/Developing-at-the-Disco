import * as React from 'react';
import {useState} from 'react';
import {Signup} from '../../user';
import {useSelector} from '../../../../lib/react-redux';
import {currentUser} from '../../../store/user/selector';
import {has, classes} from '../../../../lib/util/helpers';
import {Path} from '../../index';
import {Redirect} from 'react-router-dom';
import './Authorization.css';

export const Authorization = () => {
  const authorized = has(useSelector(currentUser));
  const [removed, isRemoved] = useState(false);
  const [done, isInternalSceneDone] = useState(false);
  const hasAuthorization = done && removed && authorized;

  return hasAuthorization ? <Redirect to={Path.HOME}/> : <main id='content'>
    <Signup id='create-user'
            onSceneEnd={() => isInternalSceneDone(true)}
            onAnimationEnd={() => isRemoved(true)}
            className={classes('authorization', authorized && 'remove')}/>
  </main>;
};
