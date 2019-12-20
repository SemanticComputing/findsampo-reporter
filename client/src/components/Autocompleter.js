import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAutocompleteData } from '../actions/findNotification';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, TextField } from '@material-ui/core';
import intl from 'react-intl-universal';
import { setFindType, setFindMaterial, setFindTiming } from '../actions/findNotification';
import { TreeViewTypes } from '../helpers/enum/enums';

const Autocompleter = (props) => {
  const MIN_WORD_LENGTH = 2;
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { getAutocompleteData, autocompleteResults, propertyType, label, placeholder,
    setFindType, setFindMaterial, setFindTiming, currentFindIndex, isFetching } = props;
  const loading = open && suggestion.length >= MIN_WORD_LENGTH && isFetching;

  useEffect(() => {
    if (suggestion.length >= MIN_WORD_LENGTH) {
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
      className="answer-options__autocomplete"
      multiple
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.uri === value.uri}
      getOptionLabel={option => option.prefLabel}
      options={autocompleteResults}
      loading={loading}
      onChange={(event, values) => saveAutoCompleteChanges(values)}
      noOptionsText={intl.get('autocompleter.noOptions')}
      loadingText={intl.get('autocompleter.loading')}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
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