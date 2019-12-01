import * as React from 'react';
import {useState} from 'react';
import {Signup} from '../../user';
import {classes} from '../../util/helpers';
import './Authorization.css';
import {navigate} from 'hookrouter';

interface MainProps {
  hasCurrentUser: boolean;
  signupEnded: (ended: boolean) => void;
}

export const Authorization = ({hasCurrentUser, signupEnded}: MainProps) => {
  const [sceneIsDone, isSceneDone] = useState(false);

  const onAnimationEnd = () => {
    if (sceneIsDone) {
      signupEnded(true);
      navigate('/');
    }
  };

  return <main id='content'>
    <Signup className={classes('signup', hasCurrentUser && sceneIsDone && 'remove')}
            onAnimationEnd={onAnimationEnd}
            onSceneEnd={() => isSceneDone(true)}/>
  </main>;
};
