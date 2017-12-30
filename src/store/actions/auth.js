import { AsyncStorage }from 'react-native';
import {TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';



const authApiSign = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAGbeiwxZxbv-Wmn6NsMAU1pneYidBbDyw"
const authApiLogin = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAGbeiwxZxbv-Wmn6NsMAU1pneYidBbDyw"
const refTokenUrl = "https://securetoken.googleapis.com/v1/token?key=AIzaSyAGbeiwxZxbv-Wmn6NsMAU1pneYidBbDyw"
let authUrl = null;


export const tryAuth = (authData, authMode) => {
  return  dispatch => {
    if(authMode === "login"){
      authUrl = authApiLogin
    }else{
      authUrl = authApiSign      
    }
    dispatch(authSignup(authData))
  }
}

export const authSignup = authData =>{
    return dispatch => {
      dispatch(uiStartLoading())
      fetch(authUrl,{
        method: "POST",
        body:JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }), 
        headers:{
          "Content-Type":"application/json"
        }  
      }).then(
        res =>res.json()
      ).then(
        parseRes =>{
          dispatch(uiStopLoading())
          if(!parseRes.idToken){
            alert("Something Went Wrong")
          }else{
            dispatch(authStoreToken(parseRes.idToken, parseRes.expiresIn, parseRes.refreshToken))
            startMainTabs()
          }
        }
      ).catch(
        err => {
          dispatch(uiStopLoading())
          alert("Something Went Wrong")
        }
      )
    }
}  

export const authSetToken = (token, expiryDate) =>{
  return {
    type: AUTH_SET_TOKEN,
    token,
    expiryDate
  }
}

export const authStoreToken = (token, expiresIn, refreshToken) =>{
  return dispatch =>{
      const now = new Date();
      const expiryDate = now.getTime() + expiresIn * 1000
      dispatch(authSetToken(token, expiryDate));
      AsyncStorage.setItem("ap:auth:token", token)
      AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString())
      AsyncStorage.setItem("ap:auth:refreshToken", refreshToken)
  }
}

export const authGetToken =  () =>{
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject)=>{
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if(!token || new Date(expiryDate <= new Date()) ){
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token").then( tokenFromStorage =>{
          fetchedToken = tokenFromStorage;
          if(!tokenFromStorage){
            reject();
            return;
          }
          return AsyncStorage.getItem("ap:auth:expiryDate")
        }
        ).then(expiryDate=>{
          const parseExpiryDate = new Date(parseInt(expiryDate));
          const now = new Date();
          if (parseExpiryDate > now){
            dispatch(authSetToken(fetchedToken))
            resolve(fetchedToken)
          }else{
            reject();
          }
        }).catch(err =>{
          console.log(err)
          reject()
        })
      }else{
        resolve(token)
        return;
      }
    });
    return promise.catch(err => {
      return AsyncStorage.getItem("ap:auth:refreshToken")
      .then(refreshToken => {
        return fetch(refTokenUrl,{
          method: "POST",
          headers:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "grant_type=refresh_token&refresh_token="+ refreshToken,
        })
      }).then(res => res.json())
      .then(parseRes => {
        if(parseRes.id_token){
          dispatch(authStoreToken(parseRes.id_token, parseRes.expires_in, parseRes.refresh_token));
          return parseRes.id_token;
        }else{
          dispatch(authClearStorage())
        }
      })
    }).then(token => {
      if(!token){
        throw(new Error());
      }else{
        return token
      }
    })
  }
}

export const authAutoSignIn = () =>{
  return dispatch =>{
    dispatch(authGetToken()).then(
      token =>{
        startMainTabs()
      }
    ).catch(error => console.log("failed to fetch token!"))
  }
}

export const authClearStorage = () => {
 return dispatch => {
  AsyncStorage.removeItem("ap:auth:token")
  AsyncStorage.removeItem("ap:auth:expiryDate")
  return AsyncStorage.removeItem("ap:auth:refreshToken")
 }
}

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage()).then(() => {
      App();
    }, dispatch(authRemoveToken()))
  }
}

export const authRemoveToken = () =>{
  return {
   type: AUTH_REMOVE_TOKEN,
  }
}