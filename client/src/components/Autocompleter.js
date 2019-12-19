import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAutocompleteData } from '../actions/findNotification';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, TextField } from '@material-ui/core';
import { setFindType, setFindMaterial, setFindTiming } from '../actions/findNotification';
import { TreeViewTypes } from '../helpers/enum/enums';

const Autocompleter = (props) => {
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { getAutocompleteData, autocompleteResults, propertyType,
    setFindType, setFindMaterial, setFindTiming, currentFindIndex, isFetching } = props;
  const loading = open && suggestion.length >= 2 && isFetching;

  useEffect(() => {
    if (suggestion.length >= 2) {
      getAutocompleteData(suggestion, propertyType);
    } else {
      setOpen(false);
    }
  }, [suggestion, propertyType, getAutocompleteData]);

  const saveAutoCompleteChanges = (values) => {
    const uriValues = values.map((v => v.uri));
    if (propertyType === TreeViewTypes.TYPE) {
      return setFindType(uriValues, currentFindIndex);
    } else if (propertyType === TreeViewTypes.ERAS) {
      return setFindTiming(uriValues, currentFindIndex);
    } else if (propertyType === TreeViewTypes.MATERIAL) {
      return setFindMaterial(uriValues, currentFindIndex);
    }
  };

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
      onChange={(event, values) => saveAutoCompleteChanges(values)}
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
  autocompleteResults: state.findNotification.autocomplete.results,
  currentFindIndex: state.findNotification.currentFindIndex
});

const mapDispatchToProps = (dispatch) => ({
  setFindType: (findType, index) => dispatch(setFindType(findType, index)),
  setFindMaterial: (findMaterial, index) => dispatch(setFindMaterial(findMaterial, index)),
  setFindTiming: (findTiming, index) => dispatch(setFindTiming(findTiming, index)),
  getAutocompleteData: (suggestion, propertyType) => dispatch(getAutocompleteData(suggestion, propertyType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocompleter);