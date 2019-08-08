import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import intl from 'react-intl-universal';
import { withRouter } from 'react-router-dom';
import { changeQuestion, postReport } from '../../actions/report';
import { changeFindIndex, setStatusToAwaitReview } from '../../actions/findNotification';
import { QuestionDependencies, ButtonActions } from '../../helpers/enum/enums';
import { enqueueSnackbar } from '../../actions/notifier';
import { changeSnipperStatus } from '../../actions/notifier';

const REPORT_LAST_STEP = 15;

const ButtonBar = (props) => (
  <div className="button-bar">
    {
      props.buttons.map((btn) => {
        const isDisabled = isButtonDisabled(props);
        return (
          <Button
            disabled={isDisabled}
            variant="contained"
            color="primary"
            onClick={() => onButtonClick(props, btn)}
            key={btn.text}
          >
            {intl.get(btn.text)}
          </Button>
        );
      })
    }
  </div>
);

/**
 * Checks if the button needs a store property to continue.
 * Button is disabled until requested property is in the store
 * @param {props} props 
 */
const isButtonDisabled = (props) => {
  const hasDependencies = !!props.dependentOn;
  const { dependentOn, finds, currentFindIndex } = props;
  if (hasDependencies) {
    switch (dependentOn) {
      case QuestionDependencies.LOCATION:
        if (finds[currentFindIndex] && finds[currentFindIndex].findSite.coords) {
          return false;
        }
        return true;
      case QuestionDependencies.FIND_SITE_PHOTO:
        if (finds[currentFindIndex].findSite.photos && finds[currentFindIndex].findSite.photos.length > 0) {
          return false;
        }
        return true;
      case QuestionDependencies.FIND_PHOTO:
        if (finds.length > 0 && finds[currentFindIndex]) {
          if (finds[currentFindIndex].photos && finds[currentFindIndex].photos.length > 0) return false;
        }
        return true;
      default:
        return false;
    }
  }
  return false;
};

const onButtonClick = (props, btn) => {
  // Change the question
  props.changeQuestion(btn.nextStep);
  // And check if the button has any action to execute
  if (btn.action) {
    executeButtonAction(props, btn.action);
  }
  // Update find notification on every step
  if (btn.nextStep !== REPORT_LAST_STEP && props.currentStep >= 2) {
    sendFindNotification(props);
  }
};

/**
 * This function is responsible to execute all button actions
 * 
 * @param {Action to execute} buttonAction 
 */
const executeButtonAction = (props, buttonAction) => {
  switch (buttonAction) {
    case ButtonActions.CHANGE_CURRENT_FIND_INDEX:
      props.changeFindIndex(props.currentFindIndex + 1);
      break;
    case ButtonActions.SEND_FIND_NOTIFICATION:
      finaliseNotification(props, true);
      break;
  }
};

/**
 * Upsert find notification
 * @param {props} props
 * @param {isFinalised} tells if report is totally filled in
 */
const sendFindNotification = (props, isFinalised = false) => {
  props.postReport(isFinalised);
};

/**
 * Upsert find notification and finalise reporting process
 * @param {props} props 
 * @param {isFinalised} tells if report is totally filled in
 */
const finaliseNotification = (props, isFinalised) => {
  props.setStatusToAwaitReview();
  sendFindNotification(props, isFinalised);
  // Show loading spinner
  props.changeSnipperStatus(true);
};

const mapStateToProps = (state) => ({
  buttons: state.report.questions[state.report.currentStep].buttons,
  dependentOn: state.report.questions[state.report.currentStep].dependentOn,
  currentFindIndex: state.findNotification.currentFindIndex,
  finds: state.findNotification.finds,
  currentStep: state.report.currentStep
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: (step) => dispatch(changeQuestion(step)),
  changeFindIndex: (index) => dispatch(changeFindIndex(index)),
  setStatusToAwaitReview: () => dispatch(setStatusToAwaitReview()),
  postReport: (isFinalised) => dispatch(postReport(isFinalised)),
  enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
  changeSnipperStatus: (status) => dispatch(changeSnipperStatus(status))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonBar));