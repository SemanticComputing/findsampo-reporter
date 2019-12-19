import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAutocompleteData } from '../actions/findNotification';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, TextField } from '@material-ui/core';


const Autocompleter = (props) => {
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { getAutocompleteData, autocompleteResults, propertyType } = props;
  const loading = open && suggestion.length >= 2 && props.isFetching;

  useEffect(() => {
    if (suggestion.length >= 2) {
      getAutocompleteData(suggestion, propertyType);
    } else {
      setOpen(false);
    }
  }, [suggestion, propertyType, getAutocompleteData]);

  return (
    <Autocomplete
      multiple
      style={{ width: 300 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.uri === value.uri}
      getOptionLabel={option => option.prefLabel}
      options={autocompleteResults}
      loading={loading}
      onChange={(e, o) => console.log('selected', o)}
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
  getAutocompleteData: (suggestion, propertyType) => dispatch(getAutocompleteData(suggestion, propertyType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocompleter);