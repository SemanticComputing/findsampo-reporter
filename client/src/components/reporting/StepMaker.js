import React from 'react';
import { connect } from 'react-redux';
import { Stepper, Step, StepLabel } from '@material-ui/core/';
import intl from 'react-intl-universal';

const StepMaker = (props) => {
  const steps = getSteps();
  const activeStep = getActiveStep(props.currentStep);
  return (
    <div className="step-maker">
      <Stepper className="step-maker__container" activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

// Step boundaries
const START_MAX = 1;
const DETAILS_MAX = 6;
const ADDITIONALS_MAX = 14;

// Get current report steps
const getSteps = () => {
  return [intl.get('report.stepOne'), intl.get('report.stepTwo'), intl.get('report.stepThree'), intl.get('report.stepFour')];
};

// Get the step of the current question
const getActiveStep = (currentStep) => {
  if (currentStep <= START_MAX) {
    return 0;
  } else if (currentStep > START_MAX && currentStep <= DETAILS_MAX) {
    return 1;
  } else if (currentStep > DETAILS_MAX && currentStep <= ADDITIONALS_MAX) {
    return 2;
  } else {
    return 3;
  }
};

const mapStateToProps = (state) => ({
  currentStep: state.report.currentStep,
});

export default connect(mapStateToProps)(StepMaker);
