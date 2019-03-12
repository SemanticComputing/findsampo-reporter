import React, { Component } from 'react';
import { connect } from 'react-redux';
import HelpBar from './HelpBar';
import { Icon } from '@material-ui/core';
import AnswerOptions from './AnswerOptions';
import ButtonBar from './ButtonBar';

class Question extends Component {

  render() {
    const {icon, question} = this.props.questions[this.props.currentStep];
    return (
      <div className="question">
        <HelpBar />
        {
          icon && 
          <Icon className="question__icon" size="large">{icon}</Icon>
        }
        <p>{question}</p>
        <AnswerOptions />
        <ButtonBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStep: state.report.currentStep,
  questions: state.report.questions
});

export default connect(mapStateToProps)(Question);