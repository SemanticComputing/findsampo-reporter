import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import StepMaker from '../reporting/StepMaker';

/**
 * This component is used to create report questions. 
 */
class Report extends Component {
  render() {
    return (
      <div className="report">
        <StepMaker />
        <Question />
      </div>
    );
  }
}

export default connect()(Report);