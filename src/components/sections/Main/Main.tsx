import * as React from 'react';
import './Main.css';
import {Signup} from '../../user';

interface MainProps {
  noCurrentUser: boolean;
}

export const Main = ({noCurrentUser}: MainProps) => {
  return <main id='content'>
    {noCurrentUser && <Signup/>}
  </main>;
};
