import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { changeQuestion } from '../../actions/report';
import { changeFindIndex } from '../../actions/findNotification';
import intl from 'react-intl-universal';
import { ButtonActions } from '../../helpers/enum/enums';

const ButtonBar = (props) => (
  <div className="button-bar">
    {
      props.buttons.map((btn) => {
        return (
          <Button
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
  currentFindIndex: state.findNotification.currentFindIndex
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: (step) => dispatch(changeQuestion(step)),
  changeFindIndex: (index) => dispatch(changeFindIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);