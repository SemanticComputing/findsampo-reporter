import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class AppHomePage extends Component {
  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/report"
        >
          Report a find
        </Button>
      </div>
    );
  }
}

export default AppHomePage;
