import * as React from 'react';
import {Info} from '../../user';
import {useSelector} from '../../../store/reactRedux';
import './Header.css';
import {checkForCurrentUserReady} from '../../user/store/selectors';

export const Header = () => {
  const hasCurrentUser = useSelector(checkForCurrentUserReady);
  return <header id='main-header'>
    {hasCurrentUser && <Info/>}
  </header>;
};
