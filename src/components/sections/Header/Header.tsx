import * as React from 'react';
import './Header.css';
import {Info} from '../../user';

interface HeaderProps {
  hasCurrentUser: boolean;
}

export const Header = ({hasCurrentUser}: HeaderProps) => {
  return <header id='main-header'>
    {hasCurrentUser && <Info/>}
  </header>;
};
