import React, { Component } from 'react';
import { connect } from 'react-redux';


class MyFindsPage extends Component {
  render() {
    return (
      <p>My Finds Page</p>
    );
  }
}

export default connect()(MyFindsPage);