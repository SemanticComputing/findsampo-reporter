import React from 'react';
import intl from 'react-intl-universal';
import {
  Link,
  Icon,
  Divider,
  Typography,
  Paper
} from '@material-ui/core';
import { RouterPaths } from '../../helpers/enum/enums';

const FHA_HOW_TO_REPORT_PAGE = 'https://www.museovirasto.fi/en/cultural-environment/archaeological-cultural-heritage/reporting-a-discovery';
const FHA_PROTECTING_CULTURAL_HERITAGE_PAGE = 'https://www.museovirasto.fi/en/cultural-environment/archaeological-cultural-heritage/protecting-the-archaeological-cultural-heritage';

const MorePage = () => {
  return (
    <div className="more-page">
      <div className="more-page__container">
        <Typography variant="overline" gutterBottom className="more-page__container__header">
          {intl.get('morePage.headers.usefulTools')}
        </Typography>
        <Divider className="more-page__container__divider" />
        <Paper className="more-page__container__paper">
          <Icon>settings_applications</Icon>
          <Link href={RouterPaths.LEGALITY_CHECKER_PAGE}
            className="more-page__container__paper__link"
          >
            {intl.get('morePage.checkLegality')}
          </Link>
        </Paper>
        <Paper className="more-page__container__paper">
          <Icon>link</Icon>
          <Link href={FHA_PROTECTING_CULTURAL_HERITAGE_PAGE}
            target="_blank"
            rel="noreferrer"
            className="more-page__container__paper__link"
          >
            {intl.get('morePage.fhaCulturalHeritageMaterial')}
          </Link>
        </Paper>
      </div>
      <div className="more-page__container">
        <Typography variant="overline" gutterBottom className="more-page__container__header">
          {intl.get('morePage.headers.tutorials')}
        </Typography>
        <Divider className="more-page__container__divider" />
        <Paper className="more-page__container__paper">
          <Icon>link</Icon>
          <Link href={FHA_HOW_TO_REPORT_PAGE}
            target="_blank"
            rel="noreferrer"
            className="more-page__container__paper__link"
          >
            {intl.get('morePage.fhaHowToReport')}
          </Link>
        </Paper>
      </div>
      <div className="more-page__container">
        <Typography variant="overline" gutterBottom className="more-page__container__header">
          {intl.get('morePage.headers.recommendedApps')}
        </Typography>
        <Divider className="more-page__container__divider" />
        <Paper className="more-page__container__paper">
          Example App
        </Paper>
      </div>
    </div>
  );
};

export default MorePage;