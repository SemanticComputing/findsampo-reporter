import React, { Component } from 'react';
import HelpBar from './HelpBar';
import { Icon } from '@material-ui/core';
import AnswerOptions from './AnswerOptions';
import ButtonBar from './ButtonBar';

class Question extends Component {
  render() {
    return (
      <div className="question">
        <HelpBar />
        <Icon className="question__icon" size="large">dashboard</Icon>
        <p>Have you ever heard about FinsSampo?</p>
        <AnswerOptions />
        <ButtonBar />
      </div>
    );
  }
}

export default Question;