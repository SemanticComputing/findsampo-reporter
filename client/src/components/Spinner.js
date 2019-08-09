import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = (props) => {
  const styles = {
    color: props.styles ? props.styles.color : 'white',
    backgroundColor: props.styles ? props.styles.backgroundColor : 'rgba(0, 0, 0, 0.6)'
  };

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
};

export default Spinner;