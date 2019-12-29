import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Components, {middleware, reducers} from './components';
import './public/base.css';
import {createProvider} from './store/reactRedux';
import {combineReducers, createStore} from './store/redux';

const Provider = createProvider(createStore(combineReducers(reducers), middleware));

ReactDOM.render(
  <Provider>
    <Components/>
  </Provider>,
  document.getElementById('root')
);
