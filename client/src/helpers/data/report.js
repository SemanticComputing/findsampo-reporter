import { OptionTypes, ButtonTypes, TreeViewTypes } from '../enum/enums';
import StarterKit from '../../components/instructions/StarterKit';
import GeneralKit from '../../components/instructions/GeneralKit';
import ReportingKit from '../../components/instructions/ReportingKit';
import eras from '../../helpers/data/eras';
import findTypes from '../../helpers/data/findTypes';
import findMaterials from '../../helpers/data/findMaterials';

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
          nextStep: 2
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
          nextStep: 7
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
          nextStep: 9
        }
      ]
    },
    {
      step: 7,
      icon: 'place',
      question: 'report.questionSeven.question',
      help: 'report.questionSeven.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSeven.buttonOne',
          nextStep: 3
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSeven.buttonTwo',
          nextStep: 8
        },
      ]
    },
    {
      step: 8,
      icon: 'place',
      question: 'report.questionEight.question',
      help: 'report.questionEight.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionEight.buttonOne',
          nextStep: 4
        }
      ]
    },
    {
      step: 9,
      icon: 'add_a_photo',
      question: 'report.questionNine.question',
      help: 'report.questionNine.help',
      options: {
        type: OptionTypes.PHOTOGRAPH,
        for: 'find'
      },
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
      icon: 'more',
      question: 'report.questionTen.question',
      help: 'report.questionTen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTen.buttonOne',
          nextStep: 11
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTen.buttonTwo',
          nextStep: 15
        }
      ]
    },
    {
      step: 11,
      icon: 'wb_incandescent',
      question: 'report.questionEleven.question',
      help: 'report.questionEleven.help',
      options: {
        type: OptionTypes.TREE_VIEW,
        treeData: findTypes,
        for: TreeViewTypes.TYPE
      },
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
      question: 'report.questionTwelve.question',
      help: 'report.questionTwelve.help',
      options: {
        type: OptionTypes.TREE_VIEW,
        treeData: eras,
        for: TreeViewTypes.ERAS
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTwelve.buttonOne',
          nextStep: 13
        }
      ]
    },
    {
      step: 13,
      icon: 'line_style',
      question: 'report.questionThirteen.question',
      help: 'report.questionThirteen.help',
      options: {
        type: OptionTypes.TREE_VIEW,
        treeData: findMaterials,
        for: TreeViewTypes.MATERIAL
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionThirteen.buttonOne',
          nextStep: 14
        }
      ]
    },
    {
      step: 14,
      icon: 'more_horiz',
      question: 'report.questionFourteen.question',
      help: 'report.questionFourteen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFourteen.buttonOne',
          nextStep: 15
        }
      ]
    },
    {
      step: 15,
      icon: 'add_circle_outline',
      question: 'report.questionFifteen.question',
      help: 'report.questionFifteen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFifteen.buttonOne',
          nextStep: 9
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
      icon: 'check_circle_outline',
      question: 'report.questionSixteen.question',
      help: 'report.questionSixteen.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSixteen.buttonOne',
          nextStep: 999
        }
      ]
    },
  ]
};