import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, FormControlLabel, Switch, CircularProgress } from '@material-ui/core';
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
            className="nearby__tool-bar__form-control-label"
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
          {
            this.props.finds ? (
              < Map markerData={this.props.finds} />
            ) : (
              <CircularProgress size="5rem" />
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  finds: state.finds.validatedFinds
});

const mapDispatchToProps = (dispatch) => ({
  getValidatedFinds: () => dispatch(getValidatedFinds())
});

export default connect(mapStateToProps, mapDispatchToProps)(NearbyPage);