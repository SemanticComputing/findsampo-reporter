import React from 'react';
import intl from 'react-intl-universal';
import {
  Divider,
  Typography,
  Paper
} from '@material-ui/core';

const MorePage = () => {
  return (
    <div className="more-page">
      <div className="more-page__container">
        <Typography variant="overline" gutterBottom className="more-page__container__header">
          {intl.get('morePage.headers.usefulTools')}
        </Typography>
        <Divider className="more-page__container__divider" />
        <Paper className="more-page__container__paper">
        </Paper>
      </div>
      <div className="more-page__container">
        <Typography variant="overline" gutterBottom className="more-page__container__header">
          {intl.get('morePage.headers.tutorials')}
        </Typography>
        <Divider className="more-page__container__divider" />
        <Paper className="more-page__container__paper">
        </Paper>
      </div>
      <div className="more-page__container">
        <Typography variant="overline" gutterBottom className="more-page__container__header">
          {intl.get('morePage.headers.recommendedApps')}
        </Typography>
        <Divider className="more-page__container__divider" />
        <Paper className="more-page__container__paper">
        </Paper>
      </div>
    </div>
  );
};

export default MorePage;