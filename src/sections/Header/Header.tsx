import * as React from 'react';
import {Info} from '../../components/user';

interface HeaderProps {
  hasCurrentUser: boolean;
}

export const Header = ({hasCurrentUser}: HeaderProps) => {
  return <header>
    {hasCurrentUser && <Info/>}
  </header>;
};
