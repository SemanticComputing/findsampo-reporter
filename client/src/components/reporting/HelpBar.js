import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Icon,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Paper
} from '@material-ui/core/';
import intl from 'react-intl-universal';
import { changeQuestion } from '../../actions/report';

class HelpBar extends Component {
  state = {
    open: false,
  }

  onOpenPressed = () => {
    this.setState(() => ({ open: true }));
  };

  onClosePressed = () => {
    this.setState(() => ({ open: false }));
  };

  onBackButtonPressed = () => {
    this.props.changeQuestion(this.props.currentQuestion.backStep);
  };

  onSkipButtonPressed = () => {
    this.props.changeQuestion(this.props.currentQuestion.skipStep);
  };

  render() {
    return (
      <div className="help-bar">
        <Paper className="help-bar__button-panel">
          <Button
            disabled={!this.props.hasBackStep}
            onClick={this.onBackButtonPressed}
          >
            <Icon>navigate_before</Icon>
            {intl.get('report.back')}
          </Button>

          <Icon
            onClick={this.onOpenPressed}
            className="help-bar__icon"
          >
            help_outlined
          </Icon>
          <Button
            disabled={!this.props.hasSkipStep}
            onClick={this.onSkipButtonPressed}
          >
            {intl.get('report.skip')}
            <Icon>navigate_next</Icon>
          </Button>
        </Paper>
        <Dialog
          open={this.state.open}
          onClose={this.onClosePressed}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">Help</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.currentQuestion.help && intl.get(this.props.currentQuestion.help)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClosePressed} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentQuestion: state.report.questions[state.report.currentStep],
  hasBackStep: !!state.report.questions[state.report.currentStep].backStep,
  hasSkipStep: !!state.report.questions[state.report.currentStep].skipStep
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: (step) => dispatch(changeQuestion(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpBar);