import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createProvider} from './store';
import {Components, middleware, reducers} from './components';
import './public/base.css';

const Provider = createProvider(reducers, middleware);

ReactDOM.render(
  <Provider>
    <Components/>
  </Provider>,
  document.getElementById('root')
);
