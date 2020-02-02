import React, {ReactElement} from 'react';
import {Home} from './sections';
import {Authorization} from './user';
import {Path} from './index';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PrivateRoute} from './PrivteRoute';

export const App = (): ReactElement =>
  <BrowserRouter>
    <Switch>
      <Route path={Path.AUTH} component={Authorization}/>
      <PrivateRoute exact path={Path.HOME} component={Home}/>
    </Switch>
  </BrowserRouter>;
