import * as React from 'react';
import {Info} from '../../user';
import {useSelector} from '../../../../lib/react-redux';
import {checkForCurrentUserReady} from '../../../store/selector';
import './Header.css';

export const Header = () => {
  const hasCurrentUser = useSelector(checkForCurrentUserReady);
  return <header id='main-header'>
    {hasCurrentUser && <Info/>}
  </header>;
};
