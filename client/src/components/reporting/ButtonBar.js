import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import intl from 'react-intl-universal';
import { changeQuestion } from '../../actions/report';
import { changeFindIndex } from '../../actions/findNotification';
import { ButtonActions } from '../../helpers/enum/enums';
import { QuestionDependencies } from '../../helpers/enum/enums';

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
  const { dependentOn, hasLocation, hasFindSitePhotos, findPhotos, currentFindIndex } = props;
  if (hasDependencies) {
    switch (dependentOn) {
      case QuestionDependencies.LOCATION:
        if (!hasLocation) return true;
        break;
      case QuestionDependencies.FIND_SITE_PHOTO:
        if (!hasFindSitePhotos) return true;
        break;
      case QuestionDependencies.FIND_PHOTO:
        if (findPhotos.length > 0 && findPhotos[currentFindIndex]) {
          if (findPhotos[currentFindIndex].photos.length > 0) return false;
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
};

/**
 * This function is responsible to execute all button requests
 * 
 * @param {Action to execute} buttonAction 
 */
const executeButtonAction = (props, buttonAction) => {
  switch (buttonAction) {
    case ButtonActions.CHANGE_CURRENT_FIND_INDEX:
      props.changeFindIndex(props.currentFindIndex + 1);
      break;
  }
};

const mapStateToProps = (state) => ({
  buttons: state.report.questions[state.report.currentStep].buttons,
  dependentOn: state.report.questions[state.report.currentStep].dependentOn,
  currentFindIndex: state.findNotification.currentFindIndex,
  hasLocation: !!state.findNotification.findSiteCoords,
  hasFindSitePhotos: state.findNotification.photoghraphs.length > 0,
  findPhotos: state.findNotification.finds,
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: (step) => dispatch(changeQuestion(step)),
  changeFindIndex: (index) => dispatch(changeFindIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);