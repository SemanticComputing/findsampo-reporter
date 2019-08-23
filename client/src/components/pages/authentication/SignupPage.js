import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Divider } from '@material-ui/core/';
import intl from 'react-intl-universal';
import { signup } from '../../../actions/auth';

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
    // The usage of React.forwardRef will no longer be required for react-router-dom v6.
    // see https://github.com/ReactTraining/react-router/issues/6056
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

    return (
      <div className='signup-form'>
        <Typography className="signup-form__title" variant="overline">
          {intl.get('loginPage.signup')}
        </Typography>
        <TextField
          id="username"
          label={intl.get('signupPage.username')}
          variant='outlined'
          onChange={this.onTextFieldChange}
          fullWidth
          className='signup-form__text-field'
        />
        <TextField
          id="email"
          label={intl.get('signupPage.email')}
          type='email'
          autoComplete='email'
          variant='outlined'
          onChange={this.onTextFieldChange}
          fullWidth
          className='signup-form__text-field'
        />
        <TextField
          id="password"
          label={intl.get('signupPage.password')}
          type="password"
          autoComplete="current-password"
          variant='outlined'
          onChange={this.onTextFieldChange}
          fullWidth
          className='signup-form__text-field'
        />
        <div className="signup-form__container">
          {/*<Button
            variant="contained"
            color="primary"
            onClick={this.onSignupPress}
            className="signup-form__container__button"
          >
            {intl.get('signupPage.signup')}
          </Button>*/}
          <Divider className="signup-form__container__divider" />
          <Typography variant="overline" className="signup-form__container__typography">
            {intl.get('signupPage.alreadyAMember')}
          </Typography>
          <Button
            component={AdapterLink}
            to="/login"
            variant="contained"
            color="primary"
            className="signup-form__container__button"
          >
            {intl.get('signupPage.login')}
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (credentials) => dispatch(signup(credentials))
});

export default connect(undefined, mapDispatchToProps)(SignupPage);