import { OptionTypes, ButtonTypes } from '../enum/enums';
import StarterKit from '../../components/instructions/StarterKit';
import GeneralKit from '../../components/instructions/GeneralKit';
import ReportingKit from '../../components/instructions/ReportingKit';

// Initial State of the report
export default {
  currentStep: 0,
  questions: [
    {
      step: 0,
      icon: 'local_hospital',
      question: 'report.questionZero.question',
      help: 'report.questionZero.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionZero.buttonOne',
          nextStep: 1
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionZero.buttonTwo',
          nextStep: 2
        }
      ]
    },
    {
      step: 1,
      icon: 'assignment-alert',
      question: 'report.questionOne.question',
      help: 'report.questionOne.help',
      options: {
        type: OptionTypes.EXPANSION_PANEL,
        panelElements: [
          {
            header: 'report.questionOne.options.optionOne',
            component: StarterKit
          },
          {
            header: 'report.questionOne.options.optionTwo',
            component: GeneralKit
          },
          {
            header: 'report.questionOne.options.optionThree',
            component: ReportingKit
          }
        ]
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionOne.buttonOne',
          nextStep: 3
        },
      ]
    },
    {
      step: 2,
      icon: 'place',
      question: 'report.questionTwo.question',
      help: 'report.questionTwo.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTwo.buttonOne',
          nextStep: 3
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTwo.buttonTwo',
          nextStep: 18
        },
      ]
    },
    {
      step: 3,
      question: 'report.questionThree.question',
      help: 'report.questionThree.help',
      options: {
        type: OptionTypes.MAP
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionThree.buttonOne',
          nextStep: 4
        }
      ]
    },
    {
      step: 4,
      icon: 'date_range',
      question: 'report.questionFour.question',
      help: 'report.questionFour.help',
      options: {
        type: OptionTypes.DATE_PICKER
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFour.buttonOne',
          nextStep: 5
        }
      ]
    },
    {
      step: 5,
      icon: 'announcement',
      question: 'report.questionFive.question',
      help: 'report.questionFive.help',
      options: {
        type: OptionTypes.FIELD
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFive.buttonOne',
          nextStep: 6
        }
      ]
    },
    {
      step: 6,
      icon: 'add_a_photo',
      question: 'report.questionSix.question',
      help: 'report.questionSix.help',
      options: {
        type: OptionTypes.PHOTOGRAPH,
        for: 'find-site'
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSix.buttonOne',
          nextStep: 7
        }
      ]
    },
    {
      step: 7,
      icon: 'add_a_photo',
      question: 'report.questionSeven.question',
      help: 'report.questionSeven.help',
      options: {
        type: OptionTypes.PHOTOGRAPH,
        for: 'find'
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSeven.buttonOne',
          nextStep: 8
        }
      ]
    },
    {
      step: 8,
      icon: 'more',
      question: 'report.questionEight.question',
      help: 'report.questionEight.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionEight.buttonOne',
          nextStep: 9
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionEight.buttonTwo',
          nextStep: 88 // FIX ME!
        }
      ]
    },
    {
      step: 9,
      icon: 'wb_incandescent',
      question: 'report.questionNine.question',
      help: 'report.questionNine.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionNine.buttonOne',
          nextStep: 10
        }
      ]
    },
    {
      step: 10,
      icon: 'blur_on',
      question: 'report.questionTen.question',
      help: 'report.questionTen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTen.buttonOne',
          nextStep: 11
        }
      ]
    },
    {
      step: 11,
      icon: 'line_style',
      question: 'report.questionEleven.question',
      help: 'report.questionEleven.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionEleven.buttonOne',
          nextStep: 12
        }
      ]
    },
    {
      step: 12,
      icon: 'lock',
      question: 'report.questionTwelve.question',
      help: 'report.questionTwelve.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTwelve.buttonOne',
          nextStep: 13
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTwelve.buttonTwo',
          nextStep: 13
        }
      ]
    },
    {
      step: 13,
      icon: 'public',
      question: 'report.questionThirteen.question',
      help: 'report.questionThirteen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionThirteen.buttonOne',
          nextStep: 14
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionThirteen.buttonTwo',
          nextStep: 14
        }
      ]
    },
    {
      step: 14,
      icon: 'domain',
      question: 'report.questionFourteen.question',
      help: 'report.questionFourteen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFourteen.buttonOne',
          nextStep: 15
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFourteen.buttonTwo',
          nextStep: 15
        }
      ]
    },
    {
      step: 15,
      icon: 'more_horiz',
      question: 'report.questionFifteen.question',
      help: 'report.questionFifteen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFifteen.buttonOne',
          nextStep: 16
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFifteen.buttonTwo',
          nextStep: 16
        }
      ]
    },
    {
      step: 16,
      icon: 'add_circle_outline',
      question: 'report.questionSixteen.question',
      help: 'report.questionSixteen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSixteen.buttonOne',
          nextStep: 17
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSixteen.buttonTwo',
          nextStep: 17
        }
      ]
    },
    {
      step: 17,
      icon: 'check_circle_outline',
      question: 'report.questionSeventeen.question',
      help: 'report.questionSeventeen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSeventeen.buttonOne',
          nextStep: 18
        }
      ]
    },
    {
      step: 18,
      icon: 'place',
      question: 'report.questionEightTeen.question',
      help: 'report.questionEightTeen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionEightTeen.buttonOne',
          nextStep: 3
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionEightTeen.buttonTwo',
          nextStep: 19
        },
      ]
    },
    {
      step: 19,
      icon: 'place',
      question: 'report.questionNineTeen.question',
      help: 'report.questionNineTeen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionNineTeen.buttonOne',
          nextStep: 4
        }
      ]
    },
    {
      step: 20,
      icon: 'place',
      question: 'report.questionTwenty.question',
      help: 'report.questionTwenty.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTwenty.buttonOne',
          nextStep: 4
        }
      ]
    },
  ]
};