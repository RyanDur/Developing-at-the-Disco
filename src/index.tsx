import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Components, {middleware, reducers} from './components';
import {combineReducers, createStore} from './lib/redux';
import {Provider} from './lib/react-redux';
import './public/base.css';

const store = createStore(combineReducers(reducers), middleware);

ReactDOM.render(
  <Provider store={store}>
    <Components/>
  </Provider>,
  document.getElementById('root')
);
