import * as React from 'react';
import {Info} from '../../components/user';
import './Header.css';

interface HeaderProps {
  hasCurrentUser: boolean;
}

export const Header = ({hasCurrentUser}: HeaderProps) => {
  return <header id='main-header'>
    {hasCurrentUser && <Info/>}
  </header>;
};
