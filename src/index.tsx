import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Components, {middleware, reducers} from './components';
import {combineReducers, createStore} from './lib/redux';
import {clientStorage} from './lib/redux-storage';
import {Provider} from './lib/react-redux';
import './public/base.css';

const {state, storageListener} = clientStorage();

const store = createStore(combineReducers(reducers), middleware, state);

store.subscribe(storageListener(store));

ReactDOM.render(
  <Provider store={store}>
    <Components/>
  </Provider>,
  document.getElementById('root')
);
