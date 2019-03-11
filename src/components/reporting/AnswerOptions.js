import React, { Component } from 'react';
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
    return (
      <div className="answer-options">
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={this.onOptionClicked}
              value="antoine"
            />
          }
          label="Choice 1"
        />
        <FormControlLabel
          control={
            <Checkbox checked={this.state.checked} onChange={this.onOptionClicked} value="jason" />
          }
          label="Choice 2"
        />
        <FormControlLabel
          control={
            <Checkbox checked={this.state.checked} onChange={this.onOptionClicked} value="jason" />
          }
          label="Choice 3"
        />
        <FormControlLabel
          control={
            <Checkbox checked={this.state.checked} onChange={this.onOptionClicked} value="jason" />
          }
          label="Choice 4"
        />
      </div>
    );
  }
}

export default AnswerOptions;