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
import SmartHelper from '../SmartHelper';
import { changeQuestion, postReport, deleteReport } from '../../actions/report';
import { enqueueSnackbar } from '../../actions/notifier';
import { ReportSteps, SmartHelpers } from '../../utils/enum/enums';

class HelpBar extends Component {
  state = {
    open: false,
    menuOpen: false,
    drawerOpen: false
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

  onDrawerButtonPressed = () => {
    if (this.props.smartHelpData && this.hasSmartHelpData()) {
      this.setState((prevState) => ({ drawerOpen: !prevState.drawerOpen }));
    } else {
      this.props.enqueueSnackbar({
        message: intl.get('helpBar.notifications.noDataAvailable')
      });
    }
  }

  deleteReport = () => {
    this.props.deleteReport(true);
    this.props.enqueueSnackbar({
      message: intl.get('helpBar.notifications.reportDeleted'),
      options: {
        variant: 'success',
      }
    });

    this.setState({ menuOpen: false });
  };

  saveReportAsDraft = () => {
    this.props.postReport();
    this.props.enqueueSnackbar({
      message: intl.get('helpBar.notifications.reportSent'),
      options: {
        variant: 'success',
      }
    });
    this.setState({ menuOpen: false });
  };

  hasSmartHelpData = () => {
    const { nearbyFinds, activeHelper } = this.props.smartHelpData;
    if (this.props.currentStep === ReportSteps.LOCATION) {
      if (nearbyFinds.data.length > 0) {
        return true;
      }
    } else if (this.props.currentStep === ReportSteps.MATERIAL ||
      this.props.currentStep === ReportSteps.TYPE ||
      this.props.currentStep === ReportSteps.PERIOD) {
      if (activeHelper && activeHelper !== SmartHelpers.NEARBY_HELPER &&
        (Object.keys(this.props.smartHelpData[activeHelper].nearby).length > 0 ||
          Object.keys(this.props.smartHelpData[activeHelper].overall).length > 0)) {
        return true;
      }
    } else {
      return false;
    }
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
            <Icon
              onClick={this.onDrawerButtonPressed}
              className={this.props.smartHelpData && this.hasSmartHelpData() ?
                'help-bar__icon__smart-helper' : 'help-bar__icon'}
            >
              wb_incandescent
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
            <Popper
              open={this.state.menuOpen}
              anchorEl={this.anchorEl}
              transition disablePortal className="help-bar__popper"
              placement="bottom-end"
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.onMenuClosePressed}>
                      <MenuList>
                        <MenuItem disabled={this.props.currentStep === 0} onClick={this.saveReportAsDraft}>
                          <Icon className="help-bar__button-panel__more__menu-icon">drafts</Icon>{intl.get('helpBar.saveAs')}
                        </MenuItem>
                        <MenuItem disabled={this.props.currentStep === 0} onClick={this.deleteReport}>
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
          <DialogTitle id="dialog-title">{intl.get('helpBar.dialog.header')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.currentQuestion.help && intl.get(this.props.currentQuestion.help)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClosePressed} color="primary">
              {intl.get('helpBar.dialog.closeBtn')}
            </Button>
          </DialogActions>
        </Dialog>
        {/** Smart Helper */}
        <SmartHelper open={this.state.drawerOpen} onClose={this.onDrawerButtonPressed} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentQuestion: state.report.questions[state.report.currentStep],
  currentStep: state.findNotification.currentStep,
  hasSkipStep: !!state.report.questions[state.report.currentStep].skipStep,
  hasBackStep: state.report.questions[state.report.currentStep].backStep === 0 ||
    !!state.report.questions[state.report.currentStep].backStep,
  smartHelpData: state.findNotification.smartHelper
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: (step) => dispatch(changeQuestion(step)),
  enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
  postReport: () => dispatch(postReport()),
  deleteReport: (isOnlyDelete) => dispatch(deleteReport(isOnlyDelete))
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpBar);