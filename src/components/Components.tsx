import React, {useEffect} from 'react';
import {Authorization, Header} from './sections';
import {navigate, useRoutes} from 'hookrouter';

interface ComponentsState {
  unauthorized: boolean;
}

const routes = {
  '/': () => <Header/>,
  '/authorization': () => <Authorization/>
};

export const Components = ({unauthorized}: ComponentsState) => {
  const routeResult = useRoutes(routes);

  useEffect(() => {
    if (unauthorized) navigate('/authorization');
  });

  return routeResult;
};
