import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import firebase from './firebase/firebase';
import { logout, loginLoggedUser } from './actions/auth';
import { setLocale } from './actions/locale';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// Confiture store
const store = configureStore();

// Language Settings
const lang = localStorage.getItem('locale') || 'en';
store.dispatch(setLocale(lang));

// App
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// App rendering options
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

// Firebase observer for changes to the user's sign-in state.
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(loginLoggedUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }));
    renderApp();
  } else {
    store.dispatch(logout());
    renderApp();
    // TODO: Add here navigation
    // After logging out 
  }
});
