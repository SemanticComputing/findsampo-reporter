import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import Map from '../map/Map';
import { OptionTypes } from '../../helpers/enum/enums';
import { setDate } from '../../actions/findNotification';

class AnswerOptions extends Component {

  onOptionClicked = () => {
    //this.setState(() => ({ checked: !this.state.checked }));
  }

  onFindDateChange = (selectedDate) => {
    this.props.setDate(selectedDate._d);
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
                  <Checkbox checked={this.state.checked} onChange={this.onOptionClicked} value={txt} />
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
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                autoOk
                format='DD.MM.YYYY'
                value={this.props.findDate}
                onChange={this.onFindDateChange} />
            </MuiPickersUtilsProvider>
          );
          break;
      }
    }
    return container;
  }

  render() {
    return (
      <div className="answer-options">
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
}); 

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOptions);