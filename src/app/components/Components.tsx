import React, {useEffect} from 'react';
import {Authorization, Header} from './sections';
import {navigate, useRoutes} from 'hookrouter';
import {useSelector} from '../../lib/react-redux';
import {not} from '../../lib/util/helpers';
import {checkAuthorization} from '../store/selector';

enum paths {
  home = '/',
  auth = '/authorization'
}

const routes = {
  [paths.home]: () => <Header/>,
  [paths.auth]: () => <Authorization/>
};

export const Components = () => {
  const authorized = useSelector(checkAuthorization);
  const routeResult = useRoutes(routes);

  useEffect(() => {
    if (not(authorized)) navigate(paths.auth);
  });

  return routeResult;
};
