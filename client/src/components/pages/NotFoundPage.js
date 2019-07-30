import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Typography, Button } from '@material-ui/core';
import { RouterPaths } from '../../helpers/enum/enums';
import intl from 'react-intl-universal';

const NotFoundPage = () => (
  <div className="not-found-page">
    <Icon className="not-found-page__icon">sentiment_very_dissatisfied</Icon>
    <Typography className="not-found-page__title" variant="overline">
      {intl.get('notFoundPage.pageNotFound')}
    </Typography>
    <Button
      className="not-found-page__button"
      component={Link}
      variant="outlined"
      to={RouterPaths.HOME_PAGE}
    >
      {intl.get('notFoundPage.goToHomePage')}
    </Button>
  </div>
);

export default NotFoundPage;
