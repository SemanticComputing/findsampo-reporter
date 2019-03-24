import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { startGoogleLogin, startEmailLogin } from '../../actions/auth';

class LoginPage extends Component {

  state = {
    email: '',
    password: ''
  };

  onTextFieldChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  onLoginPress = (e) => {
    e.preventDefault();
    this.props.startEmailLogin(this.state);
  }

  onLogoutPress = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className='login-form'>
        <h2>{intl.get('loginPage.title')}</h2>
        <TextField
          label={intl.get('loginPage.email')}
          type='email'
          autoComplete='email'
          variant='outlined'
          value={this.state.email}
          onChange={this.onTextFieldChange}
        />
        <TextField
          label={intl.get('loginPage.password')}
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={this.state.password}
          onChange={this.onTextFieldChange}
        />
        <Button variant="contained" color="primary" onClick={this.onLoginPress}>
          {intl.get('loginPage.login')}
        </Button>
        <Button variant="contained" color="primary" onClick={this.props.startGoogleLogin}>
          Google Log In
        </Button>
        <Button component={Link} to="/signup" variant="contained" color="primary">
          {intl.get('loginPage.signup')}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startEmailLogin: (credentials) => dispatch(startEmailLogin(credentials)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
