import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = (props) => {
  const styles = {
    color: props.styles ? props.styles.color : 'white',
    backgroundColor: props.styles ? props.styles.backgroundColor : 'rgba(0, 0, 0, 0.6)'
  };
  
  if(props.horizontalSpinner) {
    return (
      <div className="horizontal-spinner">
        <div className="horizontal-spinner__cont"></div>
      </div>
    );
  } else {
    return (
      <div
        className="spinner"
        style={{ backgroundColor: styles.backgroundColor }}>
        <CircularProgress
          className="spinner__progress-bar"
          size="100px"
          style={{ color: styles.color }} />
      </div>
    );
  }
};

export default Spinner;