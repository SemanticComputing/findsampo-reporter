
import { OptionTypes, ButtonTypes, TreeViewTypes, ButtonActions, QuestionDependencies } from '../enum/enums';
import StarterKit from '../../components/instructions/StarterKit';
import GeneralKit from '../../components/instructions/GeneralKit';
import ReportingKit from '../../components/instructions/ReportingKit';
import eras from '../../helpers/data/eras';
import findTypes from '../../helpers/data/findTypes';
import findMaterials from '../../helpers/data/findMaterials';
import Overview from '../../components/reporting/Overview';

// Initial State of the report
export default {
  currentStep: 0,
  questions: [
    {
      step: 0,
      icon: 'local_hospital',
      question: 'report.questionZero.question',
      help: 'report.questionZero.help',
      skipStep: 2,
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionZero.buttonOne',
          nextStep: 1,
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
      question: 'report.questionOne.question',
      help: 'report.questionOne.help',
      backStep: 0,
      skipStep: 2,
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
          nextStep: 3,
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionTwo.buttonTwo',
          nextStep: 7,
        },
      ]
    },
    {
      step: 3,
      question: 'report.questionThree.question',
      help: 'report.questionThree.help',
      backStep: 2,
      dependentOn: QuestionDependencies.LOCATION,
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
      question: 'report.questionFour.question',
      help: 'report.questionFour.help',
      backStep: 3,
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
      question: 'report.questionFive.question',
      help: 'report.questionFive.help',
      backStep: 4,
      skipStep: 6,
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
      question: 'report.questionSix.question',
      help: 'report.questionSix.help',
      backStep: 5,
      dependentOn: QuestionDependencies.FIND_SITE_PHOTO,
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
      question: 'report.questionSeven.question',
      help: 'report.questionSeven.help',
      backStep: 2,
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
      question: 'report.questionEight.question',
      help: 'report.questionEight.help',
      backStep: 7,
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
      question: 'report.questionNine.question',
      help: 'report.questionNine.help',
      backStep: 6,
      dependentOn: QuestionDependencies.FIND_PHOTO,
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
      question: 'report.questionTen.question',
      help: 'report.questionTen.help',
      backStep: 9,
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
      question: 'report.questionEleven.question',
      help: 'report.questionEleven.help',
      backStep: 10,
      skipStep: 12,
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
      backStep: 11,
      skipStep: 13,
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
      question: 'report.questionThirteen.question',
      help: 'report.questionThirteen.help',
      backStep: 12,
      skipStep: 14,
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
      question: 'report.questionFourteen.question',
      help: 'report.questionFourteen.help',
      backStep: 13,
      skipStep: 15,
      options: {
        type: OptionTypes.NUMBER_FIELD,
      },
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
      question: 'report.questionFifteen.question',
      help: 'report.questionFifteen.help',
      backStep: 14,
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFifteen.buttonOne',
          nextStep: 9,
          action: ButtonActions.CHANGE_CURRENT_FIND_INDEX
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
      backStep: 15,
      component: Overview,
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionSixteen.buttonOne',
          nextStep: 17,
          //action: ButtonActions.SEND_FIND_NOTIFICATION TODO: Uncomment this
        },
      ]
    },
    {
      step: 17,
      icon: 'check_circle_outline',
      question: 'report.questionSeventeen.question',
      help: 'report.questionSeventeen.help',
      buttons: []
    },
  ]
};