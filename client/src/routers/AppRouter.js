import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import AppHomePage from '../components/pages/AppHomePage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import Notifier from '../components/Notifier';
import Spinner from '../components/Spinner';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { RouterPaths } from '../helpers/enum/enums';

/**
 * Support for managing session history
 */
export const history = createBrowserHistory();


/**
 *  Root component where is also router defined.
 */
const AppRouter = () => (
  <Router history={history}>
    <div className="app">
      <div className="appbar">
        <Header />
        <Notifier />
      </div>
      <div className="content">
        <Switch>
          <Route path={RouterPaths.HOME_PAGE} component={AppHomePage} exact={true} />
          <PublicRoute path={RouterPaths.LOGIN_PAGE} component={LoginPage} />
          <PublicRoute path={RouterPaths.SIGNUP_PAGE} component={SignupPage} />
          <PrivateRoute path={RouterPaths.FIND_PAGE} component={FindPage} />
          <PrivateRoute path={RouterPaths.NEARBY_PAGE} component={NearbyPage} />
          <PrivateRoute path={RouterPaths.REPORT_PAGE} component={ReportPage} />
          <PrivateRoute path={RouterPaths.MY_FINDS_PAGE} component={MyFindsPage} />
          <PrivateRoute path={RouterPaths.MY_FINDS_REPORT_OVERVIEW_PAGE} component={MyFindsReportOverviewPage} />
          <PrivateRoute path={RouterPaths.LEGALITY_CHECKER_PAGE} component={LegalityCheckerPage} />
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

/**
 * Helper function for react lodable.
 * Called when compenent loading is in process.
 * In case of error, the given error text is thrown.
 */
const Loading = ({ error }) => {
  if (error) {
    return 'Router does not work. Please contact your administrator!';
  } else {
    return <Spinner />;
  }
};

/**
 * 
 *  React Loadable Components that are loaded only when needed
 */
const LoginPage = Loadable({
  loader: () => import('../components/pages/authentication/LoginPage'),
  loading: Loading
});

const SignupPage = Loadable({
  loader: () => import('../components/pages/authentication/SignupPage'),
  loading: Loading
});

const NearbyPage = Loadable({
  loader: () => import('../components/pages/NearbyPage'),
  loading: Loading
});

const ReportPage = Loadable({
  loader: () => import('../components/reporting/Report'),
  loading: Loading
});

const MyFindsPage = Loadable({
  loader: () => import('../components/pages/MyFindsPage'),
  loading: Loading
});

const MyFindsReportOverviewPage = Loadable({
  loader: () => import('../components/pages/MyFindsReportOverviewPage'),
  loading: Loading
});

const NotFoundPage = Loadable({
  loader: () => import('../components/pages/NotFoundPage'),
  loading: Loading
});

const LegalityCheckerPage = Loadable({
  loader: () => import('../components/pages/LegalityCheckerPage'),
  loading: Loading
});

const FindPage = Loadable({
  loader: () => import('../components/pages/FindPage'),
  loading: Loading
});