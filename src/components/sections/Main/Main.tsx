import * as React from 'react';
import {useState} from 'react';
import {Signup} from '../../user';
import {classes, not} from '../../util/helpers';
import './Main.css';

interface MainProps {
  hasCurrentUser: boolean;
  onSceneEnd: (isEnded: boolean) => void;
}

export const Main = ({hasCurrentUser, onSceneEnd}: MainProps) => {
  const [sceneIsDone, isSceneDone] = useState(false);
  const [offScreen, isOffScreen] = useState(false);

  const onAnimationEnd = () => {
    if (sceneIsDone) {
      isOffScreen(true);
      onSceneEnd(true);
    }
  };

  return <main id='content'>
    {not(offScreen) &&
    <Signup className={classes('signup', hasCurrentUser && sceneIsDone && 'remove')}
            onAnimationEnd={onAnimationEnd}
            onSceneEnd={() => isSceneDone(true)}/>}
  </main>;
};
