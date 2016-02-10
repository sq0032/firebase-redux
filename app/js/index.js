import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();
console.log(todoApp);
let store = createStore(
  todoApp,
  applyMiddleware(
    loggerMiddleware
  )
);

import actions from './actions';
window.store = store;
window.actions = actions;

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)