import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useSelector} from '../../lib/react-redux';
import {currentUser} from '../store/user/selector';
import {has} from '../../lib/util/helpers';
import React from 'react';
import {Path} from './index';

export const PrivateRoute = ({component, ...rest}: RouteProps) => {
  const authorized = has(useSelector(currentUser));
  const ComponentToRender = component;

  return <Route
    {...rest}
    render={props =>
      authorized ? <ComponentToRender {...props}/> :
        <Redirect to={{pathname: Path.AUTH, state: {from: props.location}}}/>
    }
  />;
};
