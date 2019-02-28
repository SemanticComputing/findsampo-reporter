import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { startGoogleLogin } from '../actions/auth';
import firebase from '../firebase/firebase';

class LoginPage extends Component {

  state = {
    email: '',
    password: ''
  };

  onLoginPress(e) {
    e.preventDefault();

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login succeeded!');
      })
      .catch(() => {
        console.log('Login failed!');
      });
  }

  render() {
    return (
      <div className='login-form'>
        <h2>Log In</h2>
        <TextField
          label='Email'
          type='email'
          autoComplete='email'
          variant='outlined'
          value={this.state.email}
          onChange={(email) => this.setState({ email })}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={this.state.password}
          onChange={(password) => this.setState({ password })}
        />
        <Button variant="contained" color="primary" onClick={this.onLoginPress}>
          Log In
        </Button>
        <Button variant="contained" color="primary" onClick={this.props.startGoogleLogin}>
          Google Log In
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

