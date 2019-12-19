import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Slider,
  FormControlLabel,
  TextField,
  InputAdornment,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core/';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import intl from 'react-intl-universal';
import Map from '../map/Map';
import PhotoRenderer from './PhotoRenderer';
import ExpandPanel from '../ExpandPanel';
import { OptionTypes } from '../../helpers/enum/enums';
import Autocompleter from '../Autocompleter';
import { setDate, setAdditionalMaterial, setFindDepth, setCoordinates, setMunicipality } from '../../actions/findNotification';


class AnswerOptions extends Component {
  state = {
    isExactDay: true,
    sliderValue: 30,
    isDepthSliderEnabled: true,
    isCoordinatesDialogOpen: false,
    showCustomLocation: false,
    latitude: '',
    longitude: ''
  }

  onFindDepthChanged = (event, value) => {
    const newValue = parseInt(value ? value : event.target.value) > 0 ?
      parseInt(value ? value : event.target.value) : 0;
    this.setState({ sliderValue: newValue });
    this.props.setFindDepth(newValue, this.props.currentFindIndex);
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

  onDepthFormControlLabelPressed = () => {
    this.setState({ isDepthSliderEnabled: !this.state.isDepthSliderEnabled });
  }

  onOpenCoordsDialogPressed = () => {
    this.setState({ isCoordinatesDialogOpen: true });
  }

  onCloseCoordsDialogPressed = () => {
    this.setState({ isCoordinatesDialogOpen: false });
  }

  onInsertCoordsDialogPressed = () => {
    // Change the values in the store
    this.props.setCoordinates(
      { lat: parseInt(this.state.latitude), lng: parseInt(this.state.longitude) },
      this.props.currentFindIndex
    );
    this.props.setMunicipality({ lat: parseInt(this.state.latitude), lng: parseInt(this.state.longitude) });
    // And change component state
    this.setState({
      showCustomLocation: true,
      isCoordinatesDialogOpen: false
    });
  }

  onCoordsChanged = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  renderCoordinatesInputDialog() {
    return (
      <Dialog
        open={this.state.isCoordinatesDialogOpen}
        keepMounted
        onClose={this.onCloseCoordsDialogPressed}
        aria-labelledby="coords-dialog-slide-title"
        aria-describedby="coords-dialog-slide-description"
        className="answer-options__dialog"
      >
        <DialogTitle id="coords-dialog-slide-title">{intl.get('answerOptions.dialog.title')}</DialogTitle>
        <DialogContent className="answer-options__dialog__content">
          <DialogContentText id="coords-dialog-slide-description">
            {intl.get('answerOptions.dialog.content')}
          </DialogContentText>
          <TextField
            id="latitude"
            label={intl.get('answerOptions.dialog.latitude')}
            required
            type="number"
            value={this.state.latitude}
            onChange={this.onCoordsChanged}
            className="answer-options__dialog__text-field"
            variant="outlined"
          />
          <TextField
            id="longitude"
            label={intl.get('answerOptions.dialog.longitude')}
            required
            type="number"
            value={this.state.longitude}
            onChange={this.onCoordsChanged}
            className="answer-options__dialog__text-field"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCloseCoordsDialogPressed} color="primary">
            {intl.get('answerOptions.dialog.cancel')}
          </Button>
          <Button onClick={this.onInsertCoordsDialogPressed} color="primary" disabled={!(this.state.latitude && this.state.longitude)}>
            {intl.get('answerOptions.dialog.insert')}
          </Button>
        </DialogActions>
      </Dialog>
    );
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

  renderDepthPickers() {
    const marks = [{ value: 0, label: '0cm', }, { value: 50, label: '50cm', }, { value: 100, label: '100cm', }];
    if (this.state.isDepthSliderEnabled) {
      return (<Slider
        defaultValue={30}
        max={100}
        aria-labelledby="discrete-slider-always"
        marks={marks}
        valueLabelDisplay="on"
        onChange={(event, value) => this.setState({ sliderValue: value })}
        onChangeCommitted={this.onFindDepthChanged}
        className="answer-options__slider-container__slider"
      />);
    } else {
      return (
        <TextField
          id="outlined-number"
          label={intl.get('report.questionFindDepth.label')}
          onChange={this.onFindDepthChanged}
          type="number"
          margin="normal"
          variant="outlined"
          className="answer-options__slider-container__input"
          InputProps={{
            endAdornment: <InputAdornment position="end">{intl.get('report.questionFindDepth.depthUnit')}</InputAdornment>,
          }}
        />
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
            <div className="answer-options__map-container">
              {
                this.state.showCustomLocation ? (
                  <Map
                    markerData={[{ lat: this.state.latitude, long: this.state.longitude }]}
                    useSatellite
                    setViewForMarkerData
                    zoomLevel={DETAILED_ZOOM_LEVEL} />
                ) : (
                  <Map showCurrentLocation useSatellite zoomLevel={DEFAULT_ZOOM_LEVEL} />
                )
              }
              <Button className="answer-options__map-container__button"
                variant="outlined"
                color="primary"
                onClick={this.onOpenCoordsDialogPressed}
              >
                {intl.get('answerOptions.btnEnterManually')}
              </Button>
            </div>
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
        case OptionTypes.AUTOCOMPLETE: {
          const { label, placeholder } = this.props.currentQuestion.options;
          container = (
            <Autocompleter propertyType={options.for} label={intl.get(label)} placeholder={intl.get(placeholder)} />
          );
          break;
        }
        case OptionTypes.SLIDER: {
          container = (
            <div className="answer-options__slider-container">
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.isDepthSliderEnabled}
                    onChange={this.onDepthFormControlLabelPressed}
                    color="primary"
                  />
                }
                label={intl.get('report.questionFindDepth.useSlider')}
              />
              <Avatar className="answer-options__slider-container__avatar">{this.state.sliderValue}</Avatar>
              {this.renderDepthPickers()}
            </div>
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
        {this.renderCoordinatesInputDialog()}
      </div>
    );
  }
}

const DEFAULT_ZOOM_LEVEL = 4;
const DETAILED_ZOOM_LEVEL = 7;

const mapStateToProps = (state) => ({
  currentQuestion: state.report.questions[state.report.currentStep],
  findDate: state.findNotification.date,
  currentFindIndex: state.findNotification.currentFindIndex
});

const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDate(date)),
  setAdditionalMaterial: (additionalMaterial, index) => dispatch(setAdditionalMaterial(additionalMaterial, index)),
  setFindDepth: (depth, index) => dispatch(setFindDepth(depth, index)),
  setCoordinates: (coords, index) => dispatch(setCoordinates(coords, index)),
  setMunicipality: (coords) => dispatch(setMunicipality(coords)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOptions);