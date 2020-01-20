import * as React from 'react';
import {Info} from '../../user';
import {useSelector} from '../../../../lib/react-redux';
import './Header.css';
import {currentUserSignedUp} from '../../../store/user/selector';
import {Logout} from '../../user/Logout';

export const Header = () => {
  const hasCurrentUser = useSelector(currentUserSignedUp);
  return <header id='main-header'>
    {hasCurrentUser && <Logout/>}
    {hasCurrentUser && <Info/>}
  </header>;
};
