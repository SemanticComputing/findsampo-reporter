import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getValidatedFind } from '../../actions/find';

class FindPage extends Component {
  componentDidMount() {
    const id = this.props.history.location.search.split('id=')[1];
    if (id) {
      this.props.getValidatedFind(id);
    }
  }
  render() {
    return (
      <p>This is a example page</p>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getValidatedFind: (id) => dispatch(getValidatedFind(id))
});

export default withRouter(connect(undefined, mapDispatchToProps)(FindPage));