import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import pleaseReducer from './reducers/places';
import thunk from 'redux-thunk';

const rootReducer = combineReducers(
  {
    places: pleaseReducer
  }
);

let composeEnhancers = compose

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = () =>{
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;