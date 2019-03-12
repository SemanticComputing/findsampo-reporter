import { OptionTypes, ButtonTypes } from '../enum/enums';

// Initial State of the report
export default {
  status: 'draft',
  stage: 0,
  currentStep: 0,
  questions: [
    {
      step: 0,
      icon: 'help',
      question: 'Would you like to get familiar with our started kits before starting to add your find?',
      help: 'This questions is for providing some help. Please choose one of the choices',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Yes, please!',
          nextStep: 1
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No, thanks!',
          nextStep: 2
        }
      ]
    },
    {
      step: 1,
      icon: 'dashboard',
      question: 'Great, below you can find the most relevant instructions.',
      help: 'Please select one of the guides!',
      options: {
        type: OptionTypes.TOGGLE,
        texts: ['General', 'Starter Guide', 'More']
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Continue',
          nextStep: 3
        },
      ]
    },
    {
      step: 2,
      icon: 'place',
      question: 'Are you adding a find that has recently found?',
      help: 'This question is asked to get your current location and date.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Yes, I am on the find site',
          nextStep: 4
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No, I found it a while ago',
          nextStep: 5
        },
      ]
    }
  ]
};