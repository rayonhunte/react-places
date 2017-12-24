import {TRY_AUTH} from './actionTypes';


export default tryAuth = (authData) => {
  return {
    type: TRY_AUTH,
    authData
  }
}   