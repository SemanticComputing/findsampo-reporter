import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

/**
 * This component is used to create report questions. 
 */
class Report extends Component {
  render() {
    return (
      <div className="report">
        <Question />
      </div>
    );
  }
}

export default connect()(Report);