import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PublicRoute from './PublicRoute';
import { connect } from 'react-redux';
import NotFoundPage from '../components/NotFoundPage';
import AppHomePage from '../components/AppHomePage';
import LoginPage from '../components/authentication/LoginPage';
import SignupPage from '../components/authentication/SignupPage';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const history = createHistory();

/**
 *  Root component where is also router defined.
 */
const AppRouter = () => (
  <Router history={history}>
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" component={AppHomePage} exact={true} />
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/signup" component={SignupPage} />
        <Route component={NotFoundPage}></Route>
      </Switch>
      <Footer />
    </div>
  </Router>
);

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default connect(mapStateToProps)(AppRouter);