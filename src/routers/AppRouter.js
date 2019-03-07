import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PublicRoute from './PublicRoute';
import { connect } from 'react-redux';
import NotFoundPage from '../components/NotFoundPage';
import AppHome from '../components/AppHome';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import Header from '../components/Header';

export const history = createHistory();

/**
 *  Root component where is also router defined.
 */
const AppRouter = () => (
  <Router history={history}>
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" component={AppHome} exact={true} />
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/signup" component={SignupPage} />
        <Route component={NotFoundPage}></Route>
      </Switch>
    </div>
  </Router>
);

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default connect(mapStateToProps)(AppRouter);