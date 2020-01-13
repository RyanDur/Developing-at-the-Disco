import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, {middleware, reducers} from './app/components';
import {combineReducers, createStore} from './lib/redux';
import {clientStorage} from './lib/redux-storage';
import {Provider} from './lib/react-redux';
import './public/base.css';

const {state, storeUpdateListener} = clientStorage();

const store = createStore(combineReducers(reducers), middleware, state);

store.subscribe(storeUpdateListener(store));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
