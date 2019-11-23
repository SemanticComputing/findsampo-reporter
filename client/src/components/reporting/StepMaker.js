import React from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import { Stepper, Step, StepLabel, MobileStepper } from '@material-ui/core/';
import { isDesktopScreen } from '../../helpers/functions/functions';

const StepMaker = (props) => {
  const steps = getSteps();
  const activeStep = getActiveStep(props.currentStep);
  return (
    <div className="step-maker">
      {
        isDesktopScreen(window) ? (
          <Stepper className="step-maker__desktop" activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        ) : (
          <MobileStepper
            className="step-maker__mobile"
            variant="progress"
            steps={props.totalSteps}
            position="static"
            activeStep={props.currentStep}
          />
        )
      }

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
  totalSteps: state.report.questions.length,
});

export default connect(mapStateToProps)(StepMaker);
