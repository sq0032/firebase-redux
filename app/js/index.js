import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import gameApp from './reducers';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();
console.log(gameApp);
let store = createStore(
  gameApp,
  applyMiddleware(
    loggerMiddleware
  )
);

import * as actions from './actions';
window.store = store;
window.actions = actions;

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)