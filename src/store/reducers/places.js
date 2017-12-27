import {ADD_PLACE, DELETE_PLACE} from '../actions/actionTypes'; 
const initState = {
  places: [],
};
const placeReducer = (state = initState, action) => {
    switch(action.type){
      case ADD_PLACE:
        return {
          ...state,
          places: state.places.concat({
            key: Math.random(),
            name: action.placeName,
            location: action.location, 
            image: {
              uri: action.image.uri
            }
          })
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