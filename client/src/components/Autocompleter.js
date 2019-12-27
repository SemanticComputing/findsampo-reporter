import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAutocompleteData } from '../actions/findNotification';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  CircularProgress,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Icon,
  Chip
} from '@material-ui/core';
import intl from 'react-intl-universal';
import { setFindType, setFindMaterial, setFindTiming } from '../actions/findNotification';
import { TreeViewTypes } from '../utils/enum/enums';
import { isDesktopScreen } from '../utils/functions/functions';

const Autocompleter = (props) => {
  const MIN_WORD_LENGTH = 2;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [dialogStatus, setDialogStatus] = useState(false);
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

  useEffect(() => {
    // Empty selected values
    setValues([]);
  }, [propertyType]);

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

  const renderAutocomplete = () => {
    return (
      <Autocomplete
        className="answer-options__autocomplete"
        multiple
        value={values}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        getOptionSelected={(option, value) => option.uri === value.uri}
        getOptionLabel={option => option.prefLabel}
        options={autocompleteResults}
        loading={loading}
        onChange={(event, values) => {
          setValues(values);
          saveAutoCompleteChanges(values);
        }}
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

  const renderMobileAutocomplete = () => {
    return (
      <div className="answer-options__mobile-autocomplete">
        <div
          className="answer-options__chip-container"
          onClick={() => setDialogStatus(true)}>
          {
            values.map((value) => (
              <Chip
                key={value.uri}
                label={value.prefLabel}
                clickable
                color="secondary"
                onDelete={() => setValues(values.filter((v) => v.uri !== value.uri))}
                deleteIcon={<Icon>cancel</Icon>}
              />
            ))
          }
          <span className="answer-options__chip-container__placeholder">
            {values.length <= 0 ? placeholder : ''}
          </span>
        </div>
        <Dialog fullScreen open={dialogStatus}
          onClose={() => setDialogStatus(false)}
          className="answer-options__autocomplete-dialog"
        >
          <AppBar className="answer-options__autocomplete-dialog__appbar">
            <Toolbar className="answer-options__autocomplete-dialog__appbar__toolbar">
              <IconButton
                edge="start" color="inherit" aria-label="close"
                onClick={() => setDialogStatus(false)}
              >
                <Icon fontSize="large">cancel</Icon>
              </IconButton>
              <Typography variant="h6">
                {label.charAt(0).toUpperCase() + label.slice(1) /** Capitalise the first latter */}
              </Typography>
              <Button
                autoFocus color="inherit"
                variant="outlined"
                onClick={() => setDialogStatus(false)}
              >
                {intl.get('autocompleter.save')}
              </Button>
            </Toolbar>
          </AppBar>
          {renderAutocomplete()}
        </Dialog>
      </div>
    );
  };

  return (
    isDesktopScreen(window) ? renderAutocomplete() : renderMobileAutocomplete()
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.findNotification.autocomplete.isFetching,
  autocompleteResults: state.findNotification.autocomplete.results,
  currentFindIndex: state.findNotification.currentFindIndex,
  findNotification: state.findNotification
});

const mapDispatchToProps = (dispatch) => ({
  setFindType: (findType, index) => dispatch(setFindType(findType, index)),
  setFindMaterial: (findMaterial, index) => dispatch(setFindMaterial(findMaterial, index)),
  setFindTiming: (findTiming, index) => dispatch(setFindTiming(findTiming, index)),
  getAutocompleteData: (suggestion, propertyType) => dispatch(getAutocompleteData(suggestion, propertyType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocompleter);