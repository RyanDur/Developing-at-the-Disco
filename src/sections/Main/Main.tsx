import * as React from 'react';
import {Signup} from '../../components/user';
import './Main.css';

interface MainProps {
  noCurrentUser: boolean;
}

export const Main = ({noCurrentUser}: MainProps) => {
  return <main id='content'>
    {noCurrentUser && <Signup/>}
  </main>;
};
