import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { changeQuestion } from '../../actions/report';

const ButtonBar = (props) => (
  props.buttons.map((btn) => {
    return (
      <div className="button-bar" key={btn.text}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.changeQuestion(btn.nextStep)}
        >
          {btn.text}
        </Button>
      </div>
    );
  })
);

const mapStateToProps = (state) => ({
  buttons: state.report.questions[state.report.currentStep].buttons
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: (step) => dispatch(changeQuestion(step))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);