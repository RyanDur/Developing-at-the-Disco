import React, {useEffect} from 'react';
import {Authorization, Header} from './sections';
import {navigate, useRoutes} from 'hookrouter';
import {useSelector} from '../../lib/react-redux';
import {empty, has} from '../../lib/util/helpers';
import {currentUser, currentUserSignedUp} from '../store/user/selector';

export enum path {
  home = '/',
  auth = '/authorization'
}

const routes = {
  [path.home]: () => <Header/>,
  [path.auth]: () => <Authorization/>
};

export const App = () => {
  const user = useSelector(currentUser);
  const userIsSignedUp = useSelector(currentUserSignedUp);
  const routeResult = useRoutes(routes);

  useEffect(() => {
    if (empty(user)) navigate(path.auth);
    if (userIsSignedUp) navigate(path.home);
  });

  return routeResult;
};
