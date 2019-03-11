import React, { Component } from 'react';
import HelpBar from './HelpBar';
import { Icon } from '@material-ui/core';
import AnswerOptions from './AnswerOptions';
import ButtonBar from './ButtonBar';


class Question extends Component {
  render() {
    return (
      <div>
        <HelpBar />
        <Icon size="large">query_builder</Icon>
        <p>Question: Have you ever heard about the quesries?</p>
        <AnswerOptions />
        <ButtonBar />
      </div>
    );
  }
}

export default Question;