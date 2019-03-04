import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

/*
 * PublicRoute is used to redirect the user into 
 * the right location depending on their auth
 * 
 * If the user authenticated and tries to log in again then redirected to home page
*/
export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      // TODO: Add here a notification about that the user is already logged in
      <Redirect to="/" />
    ) : (
      <div>
        <Header />
        <Component {...props} />
      </div>
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
