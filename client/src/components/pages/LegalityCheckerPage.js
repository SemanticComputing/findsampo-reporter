import React, { useState } from 'react';
import Map from '../map/Map';
import { Paper, Typography, Grow } from '@material-ui/core';
import { Fha_Wfs_Layer } from '../../utils/enum/enums';

const LegalityCheckerPage = () => {
  const [legalityResult, setLegalityResult] = useState(null);
  const [isDataLoaded, setDataStatus] = useState(false);

  const legalityResultHandler = (result) => {
    setLegalityResult(result);
    setDataStatus(true);
  };

  return (
    <div className="legality-cheker-page">
      {isDataLoaded &&
        <Grow
          in={isDataLoaded}
          style={{ transformOrigin: '0 0 0' }}
          {...(isDataLoaded ? { timeout: 1000 } : {})}
        >
          <Paper className={`legality-cheker-page__paper ${legalityResult.className}`}>
            <Typography variant="h5" component="h3">
              {legalityResult.header}
            </Typography>
            <Typography component="p">
              {legalityResult.description}
            </Typography>
          </Paper>
        </Grow>
      }
      <Map
        layers={[Fha_Wfs_Layer.ARCHEOLOGICAL_PLACES_AREAS]}
        zoomLevel={16}
        showCurrentLocation
        checkPointInPolygons
        legalityChecker
        legalityResultHandler={legalityResultHandler}
      />
    </div>
  );
};

export default LegalityCheckerPage;