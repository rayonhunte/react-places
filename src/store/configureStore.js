import {createStore, combineReducers} from 'redux';
import pleaseReducer from './reducers/places';

const rootReducer = combineReducers(
  {
    places: pleaseReducer
  }
);

const configureStore = () =>{
  return createStore(rootReducer);
}

export default configureStore;