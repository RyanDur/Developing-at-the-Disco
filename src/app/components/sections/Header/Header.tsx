import * as React from 'react';
import {Info} from '../../user';
import {Logout} from '../../user/Logout';
import './Header.css';

export const Header = () => {
  return <header id='main-header'>
    <Logout/>
    <Info/>
  </header>;
};
