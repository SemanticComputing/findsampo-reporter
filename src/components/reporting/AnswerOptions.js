import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class AnswerOptions extends Component {
  state = {
    checked: false
  }

  onOptionClicked = () => {
    this.setState(() => ({ checked: !this.state.checked }));
  }

  render() {
    const options = this.props.currentQuestion.options;
    return (
      <div className="answer-options">
        {
          options &&
          options.type === 'button' &&
          options.texts.map((txt) =>
            <FormControlLabel
              control={
                <Checkbox checked={this.state.checked} onChange={this.onOptionClicked} value={txt} />
              }
              label={txt} key={txt}
            />
          )
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentQuestion: state.report.questions[state.report.currentStep]
});

export default connect(mapStateToProps)(AnswerOptions);