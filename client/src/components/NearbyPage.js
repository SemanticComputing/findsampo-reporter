import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, FormControlLabel, Switch } from '@material-ui/core';
import Map from './map/Map';
import { getValidatedFinds } from '../actions/find';

class NearbyPage extends Component {
  componentDidMount() {
    this.props.getValidatedFinds();
  }

  render() {
    return (
      <div className="nearby">
        <div className="nearby__tool-bar">
          <Icon className="nearby__tool-bar__icon" >tune</Icon>
          <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                checked={true} // FIXME
                color="primary"
              />
            }
            label="Show Map"
          />
        </div>
        <div className="nearby__map">
          <Map data />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getValidatedFinds: () => dispatch(getValidatedFinds())
});

export default connect(undefined, mapDispatchToProps)(NearbyPage);