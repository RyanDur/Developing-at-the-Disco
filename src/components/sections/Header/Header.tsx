import * as React from 'react';
import {Info} from '../../user';
import {useSelector} from '../../../store/reactRedux';
import {checkForCurrentUser} from './selectors';
import './Header.css';

export const Header = () => {
  const hasCurrentUser = useSelector(checkForCurrentUser);
  return <header id='main-header'>
    {hasCurrentUser && <Info/>}
  </header>;
};
