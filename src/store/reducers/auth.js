import {TRY_AUTH} from '../actions/actionTypes';
const initState = {}

const authReducer = (state= initState, action) =>{
  switch(action.type){
    case TRY_AUTH:
      return state
    default:
      return state
  }
}

export default authReducer;