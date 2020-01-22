import * as React from 'react';
import {Signup} from '../../user';
import {useSelector} from '../../../../lib/react-redux';
import {currentUser} from '../../../store/user/selector';
import {has, join} from '../../../../lib/util/helpers';
import './Authorization.css';
import {useHistory} from 'react-router-dom';
import {Path} from '../../index';
import {useEffect, useState} from 'react';

export const Authorization = () => {
  const user = useSelector(currentUser);
  const [sceneHasEnded, sceneEnded] = useState(false);
  const [animationHasEnded, animationEnded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (animationHasEnded) history.push(Path.HOME);
  });

  return <main id='content'>
    <Signup id='create-user'
            onSceneEnd={() => sceneEnded(true)}
            onAnimationEnd={() => animationEnded(true)}
            className={join('authorization', sceneHasEnded && has(user) && 'remove')}/>
  </main>;
};
