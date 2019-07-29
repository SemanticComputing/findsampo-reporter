import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Icon,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem
} from '@material-ui/core/';
import intl from 'react-intl-universal';
import { withRouter } from 'react-router-dom';
import { changeQuestion, postReport, deleteReport } from '../../actions/report';
import { enqueueSnackbar } from '../../actions/notifier';
import { RouterPaths } from '../../helpers/enum/enums';

class HelpBar extends Component {
  state = {
    open: false,
    menuOpen: false
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

  onMenuOpenPressed = () => {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  };

  onMenuClosePressed = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ menuOpen: false });
  };

  deleteReport = () => {    
    this.props.deleteReport();
    this.props.enqueueSnackbar({
      message: 'The report has been deleted succesfully!',
      options: {
        variant: 'success',
      },
    });

    this.setState({ menuOpen: false });

    this.props.history.push(RouterPaths.MY_FINDS_PAGE);

  };

  saveReportAsDraft = () => {
    this.props.postReport();
    this.props.enqueueSnackbar({
      message: 'The report has been saved as draft succesfully!',
      options: {
        variant: 'success',
      },
    });
    this.setState({ menuOpen: false });
  };

  render() {
    return (
      <div className="help-bar">
        <Paper className="help-bar__button-panel">
          <div className="help-bar__button-panel__buttons">
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
          </div>
          {/* More menu*/}
          <div className="help-bar__button-panel__more">
            <IconButton
              buttonRef={node => { this.anchorEl = node; }}
              aria-owns={this.state.menuOpen ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.onMenuOpenPressed}
            >
              <Icon>more_vert</Icon>
            </IconButton>


            <Popper open={this.state.menuOpen} anchorEl={this.anchorEl} transition disablePortal className="help-bar__popper">
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.onMenuClosePressed}>
                      <MenuList>
                        <MenuItem onClick={this.saveReportAsDraft}>
                          <Icon className="help-bar__button-panel__more__menu-icon">drafts</Icon>{intl.get('helpBar.saveAs')}
                        </MenuItem>
                        <MenuItem onClick={this.deleteReport}>
                          <Icon className="help-bar__button-panel__more__menu-icon">delete_forever</Icon>{intl.get('helpBar.delete')}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Paper>
        {/* Help Dialog */}
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
  hasSkipStep: !!state.report.questions[state.report.currentStep].skipStep,
  hasBackStep: state.report.questions[state.report.currentStep].backStep === 0 ||
    !!state.report.questions[state.report.currentStep].backStep
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: (step) => dispatch(changeQuestion(step)),
  enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
  postReport: () => dispatch(postReport()),
  deleteReport: () => dispatch(deleteReport())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HelpBar));