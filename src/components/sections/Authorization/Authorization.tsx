import * as React from 'react';
import {useState} from 'react';
import {Signup} from '../../user';
import {classes} from '../../util/helpers';
import {navigate} from 'hookrouter';
import {useDispatch, useSelector} from '../../../store/reactRedux';
import {signupDone} from '../../user/store/action';
import './Authorization.css';
import {checkForCurrentUser} from '../../user/store/selectors';

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
    <Signup className={classes('signup', hasCurrentUser && sceneIsDone && 'remove')}
            onAnimationEnd={onAnimationEnd}
            onSceneEnd={() => isSceneDone(true)}/>
  </main>;
};
