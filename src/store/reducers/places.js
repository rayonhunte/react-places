import {DELETE_PLACE, SET_PLACES} from '../actions/actionTypes'; 
const initState = {
  places: [],
};
const placeReducer = (state = initState, action) => {
    switch(action.type){
      case SET_PLACES:
        return {
          ...state,
          places: action.places
        }
       case DELETE_PLACE:
        return {
          ...state,
          places: state.places.filter(place =>{
            return place.key !== action.placeKey
          }),
        }
      default:
        return state;
    }
}


export default placeReducer;