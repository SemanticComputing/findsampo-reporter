import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import intl from 'react-intl-universal';
import { signup } from '../../actions/auth';

class SignupPage extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  onSignupPress = (e) => {
    e.preventDefault();
    this.props.signup(this.state);
  }

  onTextFieldChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div className='signup-form'>
        <h2>{intl.get('loginPage.signup')}</h2>
        <TextField
          id="username"
          label={intl.get('signupPage.title')}
          variant='outlined'
          onChange={this.onTextFieldChange}
        />
        <TextField
          id="email"
          label={intl.get('signupPage.email')}
          type='email'
          autoComplete='email'
          variant='outlined'
          onChange={this.onTextFieldChange}
        />
        <TextField
          id="password"
          label={intl.get('signupPage.password')}
          type="password"
          autoComplete="current-password"
          variant='outlined'
          onChange={this.onTextFieldChange}
        />
        <Button variant="contained" color="primary" onClick={this.onSignupPress}>
          {intl.get('signupPage.signup')}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (credentials) => dispatch(signup(credentials))
});

export default connect(undefined, mapDispatchToProps)(SignupPage);