import React from 'react';

const Spinner = (props) => {

  if (props.horizontalSpinner) {
    return (
      <div className="horizontal-spinner">
        <div className="horizontal-spinner__cont"></div>
      </div>
    );
  } else {
    return (
      <div className="vertical-spinner">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }
};

export default Spinner;