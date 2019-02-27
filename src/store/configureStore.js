import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      // TODO! Add REDUCERS HERE!
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};