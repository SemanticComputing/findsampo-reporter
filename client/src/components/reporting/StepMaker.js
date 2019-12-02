import React from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import { Stepper, Step, StepLabel, MobileStepper, Typography } from '@material-ui/core/';
import { isDesktopScreen } from '../../helpers/functions/functions';

const StepMaker = (props) => {
  const steps = getSteps();
  const activeStep = getActiveStep(props.currentStep);
  return (
    <div className="step-maker">
      {
        isDesktopScreen(window) ? (
          <Stepper className="step-maker__desktop" activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}
                  {
                    index === 1 && 
                  <Typography variant="caption" display="block">
                    {intl.get('report.optionalSection')}
                  </Typography>
                  }
                </StepLabel>
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
const DETAILS_SECTION_MAX = 4;
const ADDITIONALS_SECTION_MAX = 14;

// Get current report steps
const getSteps = () => {
  return [intl.get('report.stepTwo'), intl.get('report.stepThree'), intl.get('report.stepFour')];
};

// Get the step of the current question
const getActiveStep = (currentStep) => {
  if (currentStep <= DETAILS_SECTION_MAX) {
    return 0;
  } else if (currentStep > DETAILS_SECTION_MAX && currentStep <= ADDITIONALS_SECTION_MAX) {
    return 1;
  } else {
    return 2;
  }
};

const mapStateToProps = (state) => ({
  currentStep: state.report.currentStep,
  totalSteps: state.report.questions.length,
});

export default connect(mapStateToProps)(StepMaker);
