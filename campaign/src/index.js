import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import { applyMiddleware } from 'redux';
import {Map} from 'immutable'
import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './components/reducers/rootReducers';
import { initialState } from './components/reducers/uiReducers';
import { thunk } from 'redux-thunk';

const root = ReactDOM.createRoot(document.getElementById('root'));

const preloadedState = {
  ui: Map(initialState)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
  preloadedState

})
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>

        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
