
import { OptionTypes, ButtonTypes, TreeViewTypes, ButtonActions, QuestionDependencies } from '../enum/enums';
import eras from '../../helpers/data/eras';
import findTypes from '../../helpers/data/findTypes';
import findMaterials from '../../helpers/data/findMaterials';
import Overview from '../../components/reporting/Overview';
/*
import StarterKit from '../../components/instructions/StarterKit';
import GeneralKit from '../../components/instructions/GeneralKit';
import ReportingKit from '../../components/instructions/ReportingKit';
*/

// Initial State of the report
export default {
  currentStep: 0,
  questions: [
    /*{ Tutorial Questions
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
      question: 'report.questionProvideHelp.question',
      help: 'report.questionProvideHelp.help',
      backStep: 0,
      skipStep: 2,
      options: {
        type: OptionTypes.EXPANSION_PANEL,
        panelElements: [
          {
            header: 'report.questionProvideHelp.options.optionOne',
            component: StarterKit
          },
          {
            header: 'report.questionProvideHelp.options.optionTwo',
            component: GeneralKit
          },
          {
            header: 'report.questionProvideHelp.options.optionThree',
            component: ReportingKit
          }
        ]
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionProvideHelp.buttonOne',
          nextStep: 2
        },
      ]
    },*/
    {
      step: 0,
      icon: 'place',
      question: 'report.questionFindTimeDetermining.question',
      help: 'report.questionFindTimeDetermining.help',
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindTimeDetermining.buttonOne',
          nextStep: 1,
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindTimeDetermining.buttonTwo',
          nextStep: 4,
        },
      ]
    },
    {
      step: 1,
      question: 'report.questionFindLocation.question',
      help: 'report.questionFindLocation.help',
      backStep: 0,
      dependentOn: QuestionDependencies.LOCATION,
      options: {
        type: OptionTypes.MAP
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindLocation.buttonOne',
          nextStep: 2
        }
      ]
    },
    {
      step: 2,
      question: 'report.questionFindPhotos.question',
      help: 'report.questionFindPhotos.help',
      backStep: 1,
      dependentOn: QuestionDependencies.FIND_PHOTO,
      options: {
        type: OptionTypes.PHOTOGRAPH,
        for: 'find'
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindPhotos.buttonOne',
          nextStep: 3
        }
      ]
    },
    {
      step: 3,
      question: 'report.questionFindSitePhotos.question',
      help: 'report.questionFindSitePhotos.help',
      backStep: 2,
      dependentOn: QuestionDependencies.FIND_SITE_PHOTO,
      options: {
        type: OptionTypes.PHOTOGRAPH,
        for: 'find-site'
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindSitePhotos.buttonOne',
          nextStep: 5
        }
      ]
    },
    {
      step: 4,
      question: 'report.questionFindDate.question',
      help: 'report.questionFindDate.help',
      backStep: 0,
      options: {
        type: OptionTypes.DATE_PICKER
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindDate.buttonOne',
          nextStep: 1
        }
      ]
    },
    {
      step: 5,
      question: 'report.questionAddMoreInformation.question',
      help: 'report.questionAddMoreInformation.help',
      backStep: 3,
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionAddMoreInformation.buttonOne',
          nextStep: 6
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionAddMoreInformation.buttonTwo',
          nextStep: 11
        }
      ]
    },
    {
      step: 6,
      question: 'report.questionFindDepth.question',
      help: 'report.questionFindDepth.help',
      backStep: 5,
      skipStep: 7,
      options: {
        type: OptionTypes.SLIDER,
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindDepth.buttonOne',
          nextStep: 7
        }
      ]
    },
    {
      step: 7,
      question: 'report.questionFindMaterial.question',
      help: 'report.questionFindMaterial.help',
      backStep: 6,
      skipStep: 8,
      options: {
        type: OptionTypes.TREE_VIEW,
        treeData: findMaterials,
        for: TreeViewTypes.MATERIAL
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindMaterial.buttonOne',
          nextStep: 8
        }
      ]
    },
    {
      step: 8,
      question: 'report.questionFindType.question',
      help: 'report.questionFindType.help',
      backStep: 7,
      skipStep: 9,
      options: {
        type: OptionTypes.TREE_VIEW,
        treeData: findTypes,
        for: TreeViewTypes.TYPE
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindType.buttonOne',
          nextStep: 9
        }
      ]
    },
    {
      step: 9,
      question: 'report.questionFindTime.question',
      help: 'report.questionFindTime.help',
      backStep: 8,
      skipStep: 10,
      options: {
        type: OptionTypes.TREE_VIEW,
        treeData: eras,
        for: TreeViewTypes.ERAS
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionFindTime.buttonOne',
          nextStep: 10
        }
      ]
    },
    {
      step: 10,
      question: 'report.questionAdditionalMaterials.question',
      help: 'report.questionAdditionalMaterials.help',
      backStep: 9,
      skipStep: 11,
      options: {
        type: OptionTypes.FIELD
      },
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionAdditionalMaterials.buttonOne',
          nextStep: 11
        }
      ]
    },
    {
      step: 11,
      question: 'report.questionAddAnotherFind.question',
      help: 'report.questionAddAnotherFind.help',
      backStep: 10,
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionAddAnotherFind.buttonOne',
          nextStep: 1,
          action: ButtonActions.CHANGE_CURRENT_FIND_INDEX
        },
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionAddAnotherFind.buttonTwo',
          nextStep: 12
        }
      ]
    },
    {
      step: 12,
      backStep: 11,
      component: Overview,
      buttons: [
        {
          type: ButtonTypes.STEPPER,
          text: 'report.questionOverview.buttonOne',
          action: ButtonActions.SEND_FIND_NOTIFICATION
        },
      ]
    }
  ]
};