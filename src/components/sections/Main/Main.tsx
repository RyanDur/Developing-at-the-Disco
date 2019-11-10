import * as React from 'react';
import {useState} from 'react';
import {Signup} from '../../user';
import {classes, not} from '../../util/helpers';
import './Main.css';

interface MainProps {
  hasCurrentUser: boolean;
}

export const Main = ({hasCurrentUser}: MainProps) => {
  const [sceneIsDone, isSceneDone] = useState(false);
  const [offScreen, isOffScreen] = useState(false);

  return <main id='content'>
    {not(hasCurrentUser && sceneIsDone && offScreen) &&
    <Signup className={classes(sceneIsDone && 'remove')}
            onAnimationEnd={() => isOffScreen(true)}
            onSceneEnd={() => isSceneDone(true)}/>}
  </main>;
};
