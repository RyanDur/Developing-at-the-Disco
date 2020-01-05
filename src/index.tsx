import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Components, {middleware, reducers} from './components';
import './public/base.css';
import {combineReducers, createStore} from './store/redux';
import {Provider} from './store/reactRedux';

const store = createStore(combineReducers(reducers), middleware);

ReactDOM.render(
  <Provider store={store}>
    <Components/>
  </Provider>,
  document.getElementById('root')
);
