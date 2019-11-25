import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Slider,
  FormControlLabel,
  TextField,
  InputAdornment
} from '@material-ui/core/';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import intl from 'react-intl-universal';
import Map from '../map/Map';
import PhotoRenderer from './PhotoRenderer';
import ExpandPanel from '../ExpandPanel';
import TreeView from '../../components/TreeView';
import { OptionTypes } from '../../helpers/enum/enums';
import { setDate, setAdditionalMaterial, setFindDepth } from '../../actions/findNotification';


class AnswerOptions extends Component {
  state = {
    isExactDay: true
  }

  onFindDepthChanged = (event, value) => {
    this.props.setFindDepth(value, this.props.currentFindIndex);
  }

  onExactDayChanged = () => {
    this.setState((prevState) => ({ isExactDay: !prevState.isExactDay }));
  }

  onFindDateChange = (selectedDate) => {
    this.props.setDate(selectedDate);
  }

  onAdditionalMaterialTyped = (event) => {
    this.props.setAdditionalMaterial(event.target.value, this.props.currentFindIndex);
  }

  renderDatePickers() {
    if (this.state.isExactDay) {
      return (
        <DatePicker
          autoOk
          variant="outlined"
          label={intl.get('answerOptions.date')}
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
          label={intl.get('answerOptions.approximateDate')}
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
              label={intl.get('report.questionFindDepth.label')}
              onChange={this.onFindDepthChanged}
              type="number"
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">{intl.get('report.questionFindDepth.depthUnit')}</InputAdornment>,
              }}
            />
          );
          break;
        case OptionTypes.MAP:
          container = (
            <Map showCurrentLocation useSatellite zoomLevel={DEFAULT_ZOOM_LEVEL} />
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
                label={intl.get('report.questionFindDate.selectionText')}
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
              label={intl.get('answerOptions.additionalMaterials')}
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
        case OptionTypes.SLIDER: {
          const marks = [{ value: 0, label: '0cm', }, { value: 300, label: '300cm', }];
          container = (
            <Slider
              defaultValue={30}
              max={300}
              aria-labelledby="discrete-slider-always"
              marks={marks}
              valueLabelDisplay="on"
              onChangeCommitted={this.onFindDepthChanged}
              className="answer-options__slider"
            />
          );
        }
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
  setAdditionalMaterial: (additionalMaterial, index) => dispatch(setAdditionalMaterial(additionalMaterial, index)),
  setFindDepth: (depth, index) => dispatch(setFindDepth(depth, index))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOptions);