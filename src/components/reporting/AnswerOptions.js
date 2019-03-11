import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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
      <div>
        <Button
          variant="contained" 
          color="primary" 
          size="small"
          onChange={this.onOptionClicked}
        >
          <Checkbox
            checked={this.state.checked}
          />
          Choice 1
        </Button>
        <Button
          variant="contained" 
          color="primary" 
          size="small"
          onChange={this.onOptionClicked}
        >
          <Checkbox
            checked={this.state.checked}
          />
          Choice 2
        </Button>
      </div>
    );
  }
}

export default AnswerOptions;