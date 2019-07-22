import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import intl from 'react-intl-universal';
import Map from '../map/Map';
import PhotoRenderer from './PhotoRenderer';
import { OptionTypes } from '../../helpers/enum/enums';
import { setDate, setAdditionalMaterial, setFindDepth } from '../../actions/findNotification';
import ExpandPanel from '../ExpandPanel';
import TreeView from '../../components/TreeView';

class AnswerOptions extends Component {

  state = {
    isExactDay: true
  }


  onFindDepthChanged = (event) => {
    this.props.setFindDepth(event.target.value, this.props.currentFindIndex);
  }

  onExactDayChanged = () => {
    this.setState((prevState) => ({ isExactDay: !prevState.isExactDay }));
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
          format="dd.MM.yyyy"
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
        case OptionTypes.NUMBER_FIELD:
          container = (
            <TextField
              id="outlined-number"
              label={intl.get('report.questionFourteen.label')}
              onChange={this.onFindDepthChanged}
              type="number"
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">{intl.get('report.questionFourteen.depthUnit')}</InputAdornment>,
              }}
            />
          );
          break;
        case OptionTypes.MAP:
          container = (
            <Map showCurrentLocation zoomLevel={DEFAULT_ZOOM_LEVEL} />
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

const DEFAULT_ZOOM_LEVEL = 15;

const mapStateToProps = (state) => ({
  currentQuestion: state.report.questions[state.report.currentStep],
  findDate: state.findNotification.date,
  currentFindIndex: state.findNotification.currentFindIndex
});

const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDate(date)),
  setAdditionalMaterial: (text) => dispatch(setAdditionalMaterial(text)),
  setFindDepth: (depth, index) => dispatch(setFindDepth(depth, index))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOptions);