import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signup } from '../actions/auth';

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
        <h2>Sign Up</h2>
        <TextField
          id="username"
          label="Username"
          variant='outlined'
          onChange={this.onTextFieldChange}
        />
        <TextField
          id="email"
          label='Email'
          type='email'
          autoComplete='email'
          variant='outlined'
          onChange={this.onTextFieldChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant='outlined'
          onChange={this.onTextFieldChange}
        />
        <Button variant="contained" color="primary" onClick={this.onSignupPress}>
          Sign Up
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (credentials) => dispatch(signup(credentials))
});

export default connect(undefined, mapDispatchToProps)(SignupPage);