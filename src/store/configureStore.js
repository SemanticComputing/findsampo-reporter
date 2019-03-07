import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import auth from '../reducers/auth';
import locale from '../reducers/locale';
import rootLogic from '../logics/rootLogic';

// Create react middleware
const logicMiddleware = createLogicMiddleware(rootLogic);

// Prepare middleware to ensure redux can use it
const composeMiddleware = applyMiddleware(logicMiddleware);

// ComposeEnhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth,
      locale
    }),
    composeEnhancers(composeMiddleware)
  );
  return store;
};