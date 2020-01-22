import React, {ReactElement} from 'react';
import {Authorization, Header} from './sections';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Path} from './index';
import {PrivateRoute} from './PrivteRoute';

export const App = (): ReactElement =>
  <BrowserRouter>
    <Switch>
      <Route path={Path.AUTH} component={Authorization}/>
      <PrivateRoute exact path={Path.HOME} component={Header}/>
    </Switch>
  </BrowserRouter>;
