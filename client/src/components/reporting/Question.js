import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import HelpBar from './HelpBar';
import { Icon, Paper } from '@material-ui/core';
import AnswerOptions from './AnswerOptions';
import ButtonBar from './ButtonBar';
import StepMaker from '../reporting/StepMaker';
import Spinner from '../Spinner';
import { getMyFinds } from '../../actions/myFinds';
import { skipHelpTutorialSteps } from '../../actions/findNotification';
import { isEqual, isEmpty, differenceWith } from 'lodash';

class Question extends Component {

  componentDidMount() {
    if (this.props.history.location.state && this.props.history.location.state.isContinuing) {
      return;
    } else {
      if (this.props.myReports.length > 0) {
        this.props.skipHelpTutorialSteps();
      } else {
        this.props.getMyFinds();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.history.location.state && this.props.history.location.state.isContinuing) {
      return;
    } else {
      if (this.props.myReports.length > 0 &&
        !isEmpty(differenceWith(this.props.myReports, prevProps.myReports, isEqual))) {
        this.props.skipHelpTutorialSteps();
      }
    }
  }

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
  isLoading: state.notifier.isLoading,
  myReports: state.myFinds.reports
});

const mapDispatchToProps = (dispatch) => ({
  getMyFinds: () => dispatch(getMyFinds()),
  skipHelpTutorialSteps: () => dispatch(skipHelpTutorialSteps())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));