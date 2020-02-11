import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import HelpBar from './HelpBar';
import { Icon, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import AnswerOptions from './AnswerOptions';
import ButtonBar from './ButtonBar';
import StepMaker from '../reporting/StepMaker';
import Spinner from '../Spinner';
import { getMyFinds } from '../../actions/myFinds';
import { isDesktopScreen } from '../../utils/functions/functions';

class Question extends Component {

  componentDidMount() {
    if (this.props.history.location.state && this.props.history.location.state.isContinuing) {
      return;
    } else {
      this.props.getMyFinds();
    }
  }

  componentDidUpdate() {
    if (this.props.history.location.state && this.props.history.location.state.isContinuing) {
      return;
    }
  }

  renderQuestion(currentQuestion) {
    const { icon, question, component: Component } = currentQuestion;

    return (
      <div className="question">
        {isDesktopScreen(window) && <HelpBar />}
        {
          Component ? (
            <Paper className="question__paper">
              {this.renderUpperBar()}
              <Component />
              <ButtonBar />
            </Paper>
          ) : (
            <Paper className="question__paper">
              {this.renderUpperBar()}
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

  renderUpperBar() {
    return isDesktopScreen(window) ? (
      <StepMaker />
    ) : (
      <ExpansionPanel className="question__paper__expansion-panel">
        <ExpansionPanelSummary
          expandIcon={<Icon>arrow_drop_down</Icon>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="question__paper__expansion-panel__summary"
        >
          <StepMaker />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="question__paper__expansion-panel__details">
          <HelpBar />
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
  getMyFinds: () => dispatch(getMyFinds())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));