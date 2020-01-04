import React, {useEffect} from 'react';
import {Authorization, Header} from './sections';
import {navigate, useRoutes} from 'hookrouter';
import {useSelector} from '../store/reactRedux';
import {checkAuthorization} from './user/store/selectors';
import {not} from './util/helpers';

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
