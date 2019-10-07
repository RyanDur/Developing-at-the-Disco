import {Signup} from '../../components/user';
import * as React from 'react';

interface MainProps {
  noCurrentUser: boolean;
}

export const Main = ({noCurrentUser}: MainProps) => {
  return <main>
    {noCurrentUser && <Signup/>}
  </main>;
};
