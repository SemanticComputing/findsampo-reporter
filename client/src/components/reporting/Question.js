import React, { Component } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import HelpBar from './HelpBar';
import { Icon, Paper } from '@material-ui/core';
import AnswerOptions from './AnswerOptions';
import ButtonBar from './ButtonBar';
import StepMaker from '../reporting/StepMaker';
import Spinner from '../Spinner';

class Question extends Component {

  renderQuestion(currentQuestion) {
    const { icon, question, component: Component } = currentQuestion;

    return (
      <div className="question">
        <HelpBar />
        {
          Component ? (
            <Paper className="question__paper">
              <StepMaker />
              <Component />
              <ButtonBar />
            </Paper>
          ) : (
            <Paper className="question__paper">
              <StepMaker />
              <div className="question__properties">
                {
                  icon &&
                  <Icon className="question__icon" size="large">{icon}</Icon>
                }
                {
                  question &&
                  <p>{intl.get(question)}</p>
                }
              </div>
              <AnswerOptions />
              <ButtonBar />
            </Paper>
          )
        }
        {
          this.props.isLoading &&
          <Spinner />
        }
      </div>
    );
  }

  render() {
    const currentQuestion = this.props.questions[this.props.currentStep];
    return (
      this.renderQuestion(currentQuestion)
    );
  }
}

const mapStateToProps = (state) => ({
  currentStep: state.report.currentStep,
  questions: state.report.questions,
  isLoading: state.notifier.isLoading
});

export default connect(mapStateToProps)(Question);