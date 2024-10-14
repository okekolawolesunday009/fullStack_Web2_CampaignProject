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
// import rootReducer from './reducers/rootReducers';
import { initialState } from './reducers/uiReducers';
import { thunk } from 'redux-thunk';
import {PersistGate} from 'redux-persist/integration/react'
import persistedReducer from './reducers/rootReducers';
import persistStore from 'redux-persist/es/persistStore';
import { initialStateCampaign } from './reducers/campaignReducers';
import { initialNotificationState } from './reducers/notificationReducers';

const root = ReactDOM.createRoot(document.getElementById('root'));

const preloadedState = {
  ui: initialState,
  campaigns: initialStateCampaign,
  notifications: initialNotificationState
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
  preloadedState

})

const persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>

          <App />
        </Router>
        </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
