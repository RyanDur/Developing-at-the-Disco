import React, {useEffect} from 'react';
import {Authorization, Header} from './sections';
import {navigate, useRoutes} from 'hookrouter';
import {useSelector} from '../store/reactRedux';
import {checkAuthorization} from './selectors';

const routes = {
  '/': () => <Header/>,
  '/authorization': () => <Authorization/>
};

export const Components = () => {
  const unauthorized = useSelector(checkAuthorization);
  const routeResult = useRoutes(routes);

  useEffect(() => {
    if (unauthorized) navigate('/authorization');
  });

  return routeResult;
};
