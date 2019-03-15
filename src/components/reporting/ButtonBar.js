import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { changeQuestion } from '../../actions/report';
import intl from 'react-intl-universal';

const ButtonBar = (props) => (
  <div className="button-bar">
    {
      props.buttons.map((btn) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.changeQuestion(btn.nextStep)}
            key={btn.text}
          >
            {intl.get(btn.text)}
          </Button>
        );
      })
    }
  </div>
);

const mapStateToProps = (state) => ({
  buttons: state.report.questions[state.report.currentStep].buttons
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: (step) => dispatch(changeQuestion(step))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);