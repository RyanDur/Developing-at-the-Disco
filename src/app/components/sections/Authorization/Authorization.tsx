import * as React from 'react';
import {useState} from 'react';
import {Signup} from '../../user';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {has, join} from '../../../../lib/util/helpers';
import './Authorization.css';
import {signupDone} from '../../../store/user/action';
import {currentUser} from '../../../store/user/selector';

export const Authorization = () => {
  const [sceneIsDone, isSceneDone] = useState(false);
  const user = useSelector(currentUser);
  const dispatch = useDispatch();

  const onAnimationEnd = () => {
    if (sceneIsDone) dispatch(signupDone(true));
  };

  return <main id='content'>
    <Signup className={join('signup', has(user) && sceneIsDone && 'remove')}
            onAnimationEnd={onAnimationEnd}
            onSceneEnd={() => isSceneDone(true)}/>
  </main>;
};
