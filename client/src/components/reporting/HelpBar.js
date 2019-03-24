import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import intl from 'react-intl-universal';

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

  render() {
    return (
      <div className="help-bar">
        <Icon
          onClick={this.onOpenPressed}
          className="help-bar__icon"
        >
          help_outlined
        </Icon>
        <Dialog
          open={this.state.open}
          onClose={this.onClosePressed}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">Help</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {intl.get(this.props.currentQuestion.help)}
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
  currentQuestion: state.report.questions[state.report.currentStep]
});

export default connect(mapStateToProps)(HelpBar);