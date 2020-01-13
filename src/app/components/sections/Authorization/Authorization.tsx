import * as React from 'react';
import {useState} from 'react';
import {Signup} from '../../user';
import {navigate} from 'hookrouter';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {join} from '../../../../lib/util/helpers';
import './Authorization.css';
import {signupDone} from '../../../store/user/action';
import {checkForCurrentUser} from '../../../store/user/selector';

export const Authorization = () => {
  const [sceneIsDone, isSceneDone] = useState(false);
  const hasCurrentUser = useSelector(checkForCurrentUser);
  const dispatch = useDispatch();

  const onAnimationEnd = () => {
    if (sceneIsDone) {
      dispatch(signupDone(true));
      navigate('/');
    }
  };

  return <main id='content'>
    <Signup className={join('signup', hasCurrentUser && sceneIsDone && 'remove')}
            onAnimationEnd={onAnimationEnd}
            onSceneEnd={() => isSceneDone(true)}/>
  </main>;
};
