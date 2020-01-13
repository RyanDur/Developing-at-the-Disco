import * as React from 'react';
import {Info} from '../../user';
import {useSelector} from '../../../../lib/react-redux';
import './Header.css';
import {checkForCurrentUserReady} from '../../../store/user/selector';

export const Header = () => {
  const hasCurrentUser = useSelector(checkForCurrentUserReady);
  return <header id='main-header'>
    {hasCurrentUser && <Info/>}
  </header>;
};
