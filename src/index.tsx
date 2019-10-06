import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createProvider} from './store';
import {middleware, reducers, Signup} from './components';
import './public/base.css';
import {Header, Main} from './sections/Header';

const Provider = createProvider(reducers, middleware);

ReactDOM.render(
  <Provider>
    <Header/>
    <Main/>
  </Provider>,
  document.getElementById('root')
);
