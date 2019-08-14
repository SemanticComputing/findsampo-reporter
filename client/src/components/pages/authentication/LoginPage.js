import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Divider
  //Avatar
} from '@material-ui/core/';
import intl from 'react-intl-universal';
import { startGoogleLogin, startEmailLogin } from '../../../actions/auth';
import { enqueueSnackbar, changeSnipperStatus } from '../../../actions/notifier';
import Spinner from '../../Spinner';
class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    isLoginInProgress: this.props.isAuthenticated || false
  };

  onTextFieldChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  onLoginPress = (e) => {
    e.preventDefault();
    if (this.state.email.length <= 0 && this.state.password.length <= 0) {
      this.props.enqueueSnackbar({
        message: 'Password and email cannot be empty!',
        options: {
          variant: 'error',
        },
      });
    } else {
      this.props.startEmailLogin(this.state);
      this.props.changeSnipperStatus(true);
    }
  }

  onLogoutPress = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className='login-form'>
        <Typography className="login-form__title" variant="overline">
          {intl.get('loginPage.title')}
        </Typography>
        <TextField
          label={intl.get('loginPage.email')}
          type='email'
          autoComplete='email'
          variant='outlined'
          value={this.state.email}
          onChange={this.onTextFieldChange}
          fullWidth
          className='login-form__text-field'
        />
        <TextField
          label={intl.get('loginPage.password')}
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={this.state.password}
          onChange={this.onTextFieldChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              this.onLoginPress(e);
            }
          }}
          fullWidth
          className='login-form__text-field'
        />
        <div className='login-form__button-container'>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onLoginPress}
            className='login-form__button-container__button'
          >
            {intl.get('loginPage.login')}
          </Button>
          <Typography variant="overline" className='login-form__button-container__typography'>
            {intl.get('loginPage.forgotPassword')}
          </Typography>
          <Typography variant="overline" className='login-form__button-container__typography'>
            {intl.get('loginPage.loginWith')}
          </Typography>
          {/*<Avatar
            className='login-form__button-container__avatar'
            onClick={this.props.startGoogleLogin}>
            {intl.get('loginPage.googleLogin')}
          </Avatar>*/}
          <Divider className='login-form__button-container__divider' />
          <Typography variant="overline" className='login-form__button-container__typography'>
            {intl.get('loginPage.notAMemberYet')}
          </Typography>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="primary"
            className='login-form__button-container__button'
          >
            {intl.get('loginPage.signup')}
          </Button>
        </div>
        {
          this.props.isLoading &&
          <Spinner />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.notifier.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startEmailLogin: (credentials) => dispatch(startEmailLogin(credentials)),
  enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
  changeSnipperStatus: (status) => dispatch(changeSnipperStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
