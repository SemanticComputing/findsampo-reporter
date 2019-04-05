import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, Divider, Icon } from '@material-ui/core/';
import intl from 'react-intl-universal';
import Map from '../map/Map';

const OverView = (props) => {
  const { additionalMaterials, finds } = props.findNotification;
  return (
    <div className="overview">
      <Typography variant="overline">
        {intl.get('overview.title')}
      </Typography>
      <Paper className="overview__find-site" elevation={3}>
        <Typography variant="overline">
          {intl.get('overview.findSite.title')}
        </Typography>
        <Divider />
        <div className="overview__find-site__photos">
          <Typography variant="caption" className="overview__properties">
            {intl.get('overview.findSite.photos')}
          </Typography>
          <output>
          </output>
        </div>
        <div className="overview__find-site__map">
          <Typography variant="caption" className="overview__properties">
            {intl.get('overview.findSite.location')}
          </Typography>
          <Map />
        </div>
        <Typography variant="caption" className="overview__properties">
          {intl.get('overview.findSite.additionalMaterials')}
          <Typography variant="caption" className="overview__properties--value">
            <Icon>navigate_next</Icon>
            {getProperty(additionalMaterials)}
          </Typography>
        </Typography>
      </Paper>
      <Paper className="overview__find" elevation={3}>
        <Typography variant="overline">
          {intl.get('overview.find.title')}
        </Typography>
        <Divider />
        {
          finds.map((find, index) => {
            return (
              <div key={index}>
                <Typography variant="overline" className="overview__properties">
                  {intl.get('overview.find.subTitle')} {index + 1}
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.photos')}
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.depth')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.depth)}
                  </Typography>
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.type')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.type)}
                  </Typography>
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.timing')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.timing)}
                  </Typography>
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.material')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.material)}
                  </Typography>
                </Typography>
              </div>
            );
          })
        }
      </Paper>
    </div>
  );
};

const getProperty = (property) => {
  return property ? property : intl.get('overview.notProvidedValue');
};

const mapStateToProps = (state) => ({
  findNotification: state.findNotification
});

export default connect(mapStateToProps)(OverView);