import React, { Component } from 'react';
import Header from './Header';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <SignupPage />
        <LoginPage />
      </div>
    );
  }
}

export default App;
