import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import gameApp from './reducers';
import { updateGameState } from './actions';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Firebase from 'firebase';


const loggerMiddleware = createLogger();
let store = createStore(
  gameApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

//const rootRef = new Firebase("https://blazing-fire-2123.firebaseio.com/");
//rootRef.child("game").on("value", snapshot => {
////  console.log(snapshot.val());
//  store.dispatch(updateGameState(snapshot.val()));
//});