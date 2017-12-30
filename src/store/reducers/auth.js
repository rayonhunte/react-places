import {TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from '../actions/actionTypes';
const initState = {
  token: null,
  expiryDate: null
}

const authReducer = (state= initState, action) =>{
  switch(action.type){
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      }
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      }
    default:
      return state
  }
}

export default authReducer;