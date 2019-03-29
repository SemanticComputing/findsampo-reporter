import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import Map from '../map/Map';
import PhotoRenderer from './PhotoRenderer';
import { OptionTypes } from '../../helpers/enum/enums';
import { setDate, setAdditionalMaterial } from '../../actions/findNotification';
import ExpandPanel from '../ExpandPanel';
import TreeView from '../../components/TreeView';
import intl from 'react-intl-universal';

class AnswerOptions extends Component {

  state = {
    isExactDay: true
  }

  onExactDayChanged = () => {
    this.setState((prevState) => ({isExactDay: !prevState.isExactDay}));
  }

  onOptionClicked = () => {
    //this.setState(() => ({ checked: !this.state.checked }));
  }

  onFindDateChange = (selectedDate) => {
    this.props.setDate(selectedDate._d);
  }

  onAdditionalMaterialTyped = (event) => {
    this.props.setAdditionalMaterial(event.target.value);
  }

  renderDatePickers() {
    if (this.state.isExactDay) {
      return (
        <DatePicker
          autoOk
          variant="outlined"
          label="Date"
          format="DD.MM.YYYY"
          value={this.props.findDate}
          onChange={this.onFindDateChange}
          className="answer-options__date-picker" />
      );
    } else {
      return (
        <DatePicker
          autoOk
          variant="outlined"
          label="Approximate date"
          openTo="year"
          views={['year', 'month']}
          value={this.props.findDate}
          onChange={this.onFindDateChange}
          className="answer-options__date-picker" />
      );
    }
  }

  renderAnswerOptions() {
    const options = this.props.currentQuestion.options;
    let container;
    if (options) {
      switch (options.type) {
        case OptionTypes.BUTTON:
          container = (
            options.texts.map((txt) =>
              <FormControlLabel
                control={
                  <Checkbox checked={true} onChange={this.onOptionClicked} value={txt} />
                }
                label={txt} key={txt}
              />
            )
          );
          break;
        case OptionTypes.MAP:
          container = (
            <Map />
          );
          break;
        case OptionTypes.DATE_PICKER:
          container = (
            <div className="answer-options__date-picker-container">
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    checked={this.state.isExactDay}
                    onChange={this.onExactDayChanged}
                  />
                }
                label={intl.get('report.questionFour.selectionText')}
              />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                {this.renderDatePickers()}
              </MuiPickersUtilsProvider>
            </div>
          );
          break;
        case OptionTypes.PHOTOGRAPH:
          container = (
            <PhotoRenderer for={options.for} />
          );
          break;
        case OptionTypes.FIELD:
          container = (
            <TextField
              label="Additional Materials"
              multiline
              rows="3"
              margin="normal"
              variant="outlined"
              onBlur={this.onAdditionalMaterialTyped}
              className="answer-options__text-field"
            />
          );
          break;
        case OptionTypes.EXPANSION_PANEL:
          container = (
            <ExpandPanel content={options.panelElements} />
          );
          break;
        case OptionTypes.TREE_VIEW:
          container = (
            <TreeView content={options.treeData} for={options.for} />
          );
          break;
      }
    }
    return container;
  }

  render() {
    // Change styling between different steps
    const options = this.props.currentQuestion.options;
    let currentStyle;
    if (options) {
      currentStyle = (options.type == OptionTypes.TREE_VIEW || options.type == OptionTypes.MAP)
        ? 'answer-options full-content'
        : 'answer-options';
    } else {
      currentStyle = 'answer-options';
    }
    return (
      <div className={currentStyle}>
        {this.renderAnswerOptions()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentQuestion: state.report.questions[state.report.currentStep],
  findDate: state.findNotification.date
});

const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDate(date)),
  setAdditionalMaterial: (text) => dispatch(setAdditionalMaterial(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOptions);