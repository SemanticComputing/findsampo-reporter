import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Map from '../map/Map';
class AnswerOptions extends Component {
  state = {
    checked: false
  }

  onOptionClicked = () => {
    this.setState(() => ({ checked: !this.state.checked }));
  }

  renderAnswerOptions() {
    const options = this.props.currentQuestion.options;
    let container;
    if (options) {
      if (options.type === 'button') {
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
      } else if (options.type === 'map') {
        container = (
          <Map />
        );
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
  currentQuestion: state.report.questions[state.report.currentStep]
});

export default connect(mapStateToProps)(AnswerOptions);