import React, {useEffect} from 'react';
import {Authorization, Header} from './sections';
import {navigate, useRoutes} from 'hookrouter';
import {useSelector} from '../../lib/react-redux';
import {empty, has} from '../../lib/util/helpers';
import {currentUser, currentUserReady} from '../store/user/selector';

export enum paths {
  home = '/',
  auth = '/authorization'
}

const routes = {
  [paths.home]: () => <Header/>,
  [paths.auth]: () => <Authorization/>
};

export const App = () => {
  const user = useSelector(currentUser);
  const userIsReady = useSelector(currentUserReady);
  const routeResult = useRoutes(routes);

  useEffect(() => {
    if (empty(user)) navigate(paths.auth);
    if (userIsReady) navigate(paths.home);
  });

  return routeResult;
};
