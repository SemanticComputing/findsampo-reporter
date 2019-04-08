import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import NotFoundPage from '../components/NotFoundPage';
import AppHomePage from '../components/AppHomePage';
import LoginPage from '../components/authentication/LoginPage';
import SignupPage from '../components/authentication/SignupPage';
import Report from '../components/reporting/Report';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { RouterPaths } from '../helpers/enum/enums';
import Nearby from '../components/NearbyPage';

export const history = createHistory();

/**
 *  Root component where is also router defined.
 */
const AppRouter = () => (
  <Router history={history}>
    <div className="app">
      <div className="appbar">
        <Header />
      </div>
      <div className="content">
        <Switch>
          <Route path={RouterPaths.HOME_PAGE} component={AppHomePage} exact={true} />
          <PublicRoute path={RouterPaths.LOGIN_PAGE} component={LoginPage} />
          <PublicRoute path={RouterPaths.SIGNUP_PAGE} component={SignupPage} />
          <Route path={RouterPaths.NEARBY_PAGE} component={Nearby}></Route>
          <PrivateRoute path={RouterPaths.REPORT_PAGE} component={Report} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </div>
      <div className="footer">
        <BottomNav />
        <Footer />
      </div>
    </div>
  </Router>
);

const mapStateToProps = (state) => ({
  locale: state.locale
});

export default connect(mapStateToProps)(AppRouter);