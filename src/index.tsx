import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createProvider} from './store';
import {Info, middleware, reducers, Signup} from './components';
import './public/base.css';

const Provider = createProvider(reducers, middleware);

ReactDOM.render(
  <Provider>
    <header>
      <Info/>
    </header>
    <main>
      <Signup/>
    </main>
  </Provider>,
  document.getElementById('root')
);
