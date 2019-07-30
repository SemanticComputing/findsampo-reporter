import React, { useState } from 'react';
import Map from '../map/Map';
import { Paper, Typography, Grow } from '@material-ui/core';
import { Fha_Wfs_Layer } from '../../helpers/enum/enums';

const LegalityCheckerPage = () => {
  const [legalityResult, setLegalityResult] = useState(null);

  const legalityResultHandler = (result) => {
    setLegalityResult(result);
  };

  return (
    <div className="legality-cheker-page">
      {legalityResult &&
        <Grow
          in={legalityResult}
          style={{ transformOrigin: '0 0 0' }}
          {...(legalityResult ? { timeout: 1000 } : {})}
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