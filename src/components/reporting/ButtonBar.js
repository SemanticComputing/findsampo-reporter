import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonBar = () => (
  <div className="button-bar"> 
    <Button variant="contained" color="primary">
      Yes
    </Button>
    <Button variant="contained" color="primary">
      No
    </Button>
  </div>
);

export default ButtonBar;