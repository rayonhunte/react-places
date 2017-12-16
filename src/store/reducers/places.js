import {ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE} from '../actions/actionTypes'; 
const initState = {
  places: [],
  selectedPlace: null
};
const placeReducer = (state = initState, action) => {
    switch(action.type){
      case ADD_PLACE:
        return {
          ...state,
          places: state.places.concat({
            key: Math.random(),
            name: action.placeName,
            image:{
              uri: "https://s1.stabroeknews.com/images/2015/06/20150622kitty-market.jpg"
            }
          })
        }
       case DELETE_PLACE:
        return {
          ...state,
          places: state.places.filter(place =>{
            return place.key !== state.selectedPlace.key;
          }),
          selectedPlace: null
        }
      case SELECT_PLACE:
        return{
          ...state,
          selectedPlace: state.places.find( place => {
              return place.key === action.placeKey; 
            }
          )
        }
      case DESELECT_PLACE:
        return {
          ...state,
          selectedPlace: null
        }
      default:
        return state;
    }
}


export default placeReducer;