import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => (
  <div className="spinner">
    <CircularProgress className="spinner__progress-bar" size="100px"/>
  </div>
);

export default Spinner;