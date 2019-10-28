import * as React from 'react';
import './Main.css';
import {Others, Signup} from '../../user';

interface MainProps {
  noCurrentUser: boolean;
  otherUsers: boolean;
}

export const Main = ({noCurrentUser, otherUsers}: MainProps) => {
  return <main id='content'>
    {noCurrentUser && <Signup/>}
    {otherUsers && <Others/>}
  </main>;
};
