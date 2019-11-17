import * as React from 'react';
import {useEffect, useState} from 'react';
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

  useEffect(() => {
    if (offScreen) onSceneEnd(true);
  });

  return <main id='content'>
    {not(offScreen) &&
    <Signup className={classes(hasCurrentUser && sceneIsDone && 'remove')}
            onAnimationEnd={() => sceneIsDone && isOffScreen(true)}
            onSceneEnd={() => isSceneDone(true)}/>}
  </main>;
};
