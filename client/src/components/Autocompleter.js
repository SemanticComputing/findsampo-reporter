import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAutocompleteData } from '../actions/findNotification';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, TextField } from '@material-ui/core';


const Autocompleter = (props) => {
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { getAutocompleteData, autocompleteResults } = props;
  const loading = open && suggestion.length >= 2 && props.isFetching;

  // Aikakaudet: http://www.yso.fi/onto/mao/p2251
  // Materiaali: http://www.yso.fi/onto/mao/p1731
  // Tyypit: http://www.yso.fi/onto/liito/p11062

  useEffect(() => {
    if (suggestion.length >= 2) {
      getAutocompleteData(suggestion);
    } else {
      setOpen(false);
    }
  }, [suggestion, getAutocompleteData]);
  
  return (
    <Autocomplete
      style={{ width: 300 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.uri === value.uri}
      getOptionLabel={option => option.prefLabel}
      options={autocompleteResults}
      loading={loading}
      onChange={(e,o) => console.log('selected',o)}
      noOptionsText='No options'
      loadingText='Loading...'
      renderInput={params => (
        <TextField
          {...params}
          label="something"
          placeholder="e.g. "
          fullWidth
          variant="outlined"
          onChange={(event) => setSuggestion(event.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.findNotification.autocomplete.isFetching,
  autocompleteResults: state.findNotification.autocomplete.results
});

const mapDispatchToProps = (dispatch) => ({
  getAutocompleteData: (suggestion) => dispatch(getAutocompleteData(suggestion))
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocompleter);