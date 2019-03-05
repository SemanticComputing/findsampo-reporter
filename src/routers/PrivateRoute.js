import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/*
 * PrivateRoute is used to redirect the user into 
 * the right location depending on their auth
 * 
 * If the user is not authenticated then redirected to the LoginPage
*/
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        <Component {...props} />
      </div>
    ) : (
      // TODO: Add here a notification about the redirection
      <Redirect to="/login" />
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
