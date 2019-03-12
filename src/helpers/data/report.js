import { OptionTypes, ButtonTypes } from '../enum/enums';

// Initial State of the report
export default {
  status: 'draft',
  stage: 0,
  currentStep: 0,
  questions: [
    {
      step: 0,
      icon: 'local_hospital',
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
      icon: 'assignment-alert',
      question: 'Great, below you can find the most relevant instructions.',
      help: 'Please select one of the guides!',
      options: {
        type: OptionTypes.BUTTON,
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
          nextStep: 3
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No, I found it a while ago',
          nextStep: 3
        },
      ]
    },
    {
      step: 3,
      question: 'Pick the find site locaton please.',
      help: 'Mark exactly where the find has been found.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Done, continue',
          nextStep: 4
        }
      ]
    },
    {
      step: 4,
      icon: 'date_range',
      question: 'Pick a find date please.',
      help: 'Select the exact date that find has been found.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Continue',
          nextStep: 5
        }
      ]
    },
    {
      step: 5,
      icon: 'add_a_photo',
      question: 'Please add some photos from the find site.',
      help: 'Min three photos is needed.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Continue',
          nextStep: 6
        }
      ]
    },
    {
      step: 6,
      icon: 'label',
      question: 'Input a name for the find.',
      help: 'The name should be descriptive.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Continue',
          nextStep: 7
        }
      ]
    },
    {
      step: 7,
      icon: 'add_a_photo',
      question: 'Please add some photos from the find.',
      help: 'Min three photos is needed.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Continue',
          nextStep: 8
        }
      ]
    },
    {
      step: 8,
      icon: 'more',
      question: 'Would like to give some additional information about the find?',
      help: 'If you accept this, you are going to provide some additional information',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Yes,please',
          nextStep: 9
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No, thanks',
          nextStep: 88 // FIX ME!
        }
      ]
    },
    {
      step: 9,
      icon: 'wb_incandescent',
      question: 'Select the type of the find.',
      help: 'If you cannot find the type you can select others.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Continue',
          nextStep: 10
        }
      ]
    },
    {
      step: 10,
      icon: 'blur_on',
      question: 'Select the material of the find.',
      help: 'If you cannot find the material you can select others.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Continue',
          nextStep: 11
        }
      ]
    },
    {
      step: 11,
      icon: 'line_style',
      question: 'Please fill in the find details',
      help: 'Some explenation about depth and size.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Continue',
          nextStep: 12
        }
      ]
    },
    {
      step: 12,
      icon: 'lock',
      question: 'The Finnish heritage agency can publish your name at their website?',
      help: 'What does this mean? How the name is used?',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Yes',
          nextStep: 13
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No',
          nextStep: 13
        }
      ]
    },
    {
      step: 13,
      icon: 'public',
      question: 'Do you want to donete your discovery to collections?',
      help: 'What does discovery donating mean? What happens if it is done?',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Yes',
          nextStep: 14
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No',
          nextStep: 14
        }
      ]
    },
    {
      step: 14,
      icon: 'domain',
      question: 'Do you want to donete your discovery to collections?',
      help: 'What does discovery donating mean? What happens if it is done?',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Yes',
          nextStep: 15
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No',
          nextStep: 15
        }
      ]
    },
    {
      step: 15,
      icon: 'more_horiz',
      question: 'Would you like to add something?',
      help: 'Here you can provide any kind of information about the find and find site.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Yes',
          nextStep: 16
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No',
          nextStep: 16
        }
      ]
    },
    {
      step: 16,
      icon: 'add_circle_outline',
      question: 'Would you like to add another find?',
      help: 'One report can contains many finds. Some intruduction about it.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Yes, please',
          nextStep: 17
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'No, thanks',
          nextStep: 17
        }
      ]
    },
    {
      step: 17,
      icon: 'check_circle_outline',
      question: 'Your add has been added successfully.',
      help: 'You find has been sent. You will get an notification soon.',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'Finish',
          nextStep: 18
        }
      ]
    }
  ]
};