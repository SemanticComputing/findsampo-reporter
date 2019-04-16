import React from 'react';
import { connect } from 'react-redux';
import { Stepper, Step, StepLabel } from '@material-ui/core/';
import intl from 'react-intl-universal';

const StepMaker = (props) => {
  const steps = getSteps();
  const activeStep = getCurrentStep(props.currentStep);
  return (
    <div className="step-maker">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

// Get current report steps
const getSteps = () => {
  return [intl.get('report.stepOne'), intl.get('report.stepTwo'), intl.get('report.stepThree'), intl.get('report.stepFour')];
};

// Get the step of the current question
const getCurrentStep = (currentStep) => {
  if (currentStep < 3) {
    return 0;
  } else if (currentStep > 2 && currentStep < 9) {
    return 1;
  } else if (currentStep > 8 && currentStep < 17) {
    return 2;
  } else {
    return 3;
  }
};

const mapStateToProps = (state) => ({
  currentStep: state.report.currentStep,
});

export default connect(mapStateToProps)(StepMaker);
