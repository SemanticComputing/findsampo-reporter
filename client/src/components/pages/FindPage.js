import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getValidatedFind } from '../../actions/find';
import { RouterPaths } from '../../helpers/enum/enums';
import {
  Paper,
  Typography
} from '@material-ui/core';
import Map from '../map/Map';


class FindPage extends Component {
  componentDidMount() {
    const id = this.props.history.location.search.split('id=')[1];
    if (id) {
      this.props.getValidatedFind(id);
    } else {
      // TODO: Show a notification when id is missing
      this.props.history.push(RouterPaths.HOME_PAGE);
    }
  }
  render() {
    return (
      this.props.find && <div className="find-page">
        <div className="find-page__main-container">
          <div className="find-page__property-container">
            <Paper className="find-page__property-container__properties find-page__card">
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Material
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.main_material}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Type
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.type}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Municipality
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.municipality}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Specification
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.specification}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Period
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.period}
                </Typography>
              </div>
            </Paper>
            <Paper className="find-page__description find-page__card">
              <Typography variant="overline" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.find.description}
              </Typography>
            </Paper>
          </div>
          <Paper className="find-page__property-container__map find-page__card">
            <Map markerData={[this.props.find]} />
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  find: state.finds.activeFind
});

const mapDispatchToProps = (dispatch) => ({
  getValidatedFind: (id) => dispatch(getValidatedFind(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindPage));