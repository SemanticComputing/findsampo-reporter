import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Icon } from '@material-ui/core';
import intl from 'react-intl-universal';

const ExpandPanel = (props) => (
  <div className="answer-options__expand-panel">
    {
      props.content.map((element, index) => {
        const { header, component: Component } = element;
        return (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary expandIcon={<Icon>arrow_drop_down</Icon>}>
              {intl.get(header)}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Component />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })
    }
  </div>
);

export default ExpandPanel;