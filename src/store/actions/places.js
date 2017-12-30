import {ADD_PLACE, DELETE_PLACE, SET_PLACES, PLACE_ADDED, START_ADD_PLACE} from './actionTypes';
import {uiStartLoading, uiStopLoading, authGetToken} from './index';

const firebaseUrl = "https://rncourse-1514244841127.firebaseio.com/"
const storeUrl = "https://us-central1-rncourse-1514244841127.cloudfunctions.net/storeImage/"



export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken()).then(token =>{
      authToken = token;
      return fetch(storeUrl, {
        method: "POST",
        body: JSON.stringify({image: image.base64}),
        headers:{
          "authorization": "Bearer "+ token
        }
      })
    })
      .then(res => res.json())
      .then(parseRes => {
        const placeData = {
          name: placeName,
          location,
          image: parseRes.imageUrl,
          imagePath: parseRes.imagePath
        };
        return fetch(firebaseUrl + '/places.json?auth='+authToken, {
            method: "POST",
            body: JSON.stringify(placeData)
          })
          .then(res => {
            if(res.ok){
              res.json()
            }else{ new Error()}})
          .then(parseRes => {
            dispatch(uiStopLoading())
            dispatch(placeAdded())
          })
          .catch(err => {
            alert("Something went wrong")
            dispatch(uiStopLoading())
          })
      })
      .catch(err => {
        alert("Something went wrong")
        dispatch(uiStopLoading())
      })
  }
}

export const placeAdded = () =>{
  return {
    type: PLACE_ADDED,
  }
}

export const startAddPlace = () =>{
  return {
    type: START_ADD_PLACE
  }
}

export const getPlaces = () =>{
  return dispatch =>{
    dispatch(authGetToken()).then(token =>{
      return fetch(firebaseUrl + '/places.json?auth='+ token)
    }).catch(()=>{
      alert("No Valid Token")  
    })
    .then(res=>res.json())
    .then(resParse => {
      const places = []
      for (let key in resParse){
        places.push({
          ...resParse[key],
          image:{
            uri: resParse[key].image
          },
          key: key
        })
      }
      dispatch(setPlaces(places))
    })
    .catch(
      err => {
        console.log(err)
        alert("Something went wrong ")
      }
    )
  }
}

export const setPlaces = places =>{
  return {
    type: SET_PLACES,
    places 
  }
}

export const onPlaceDelete = key => {
  return dispatch => {
    dispatch(authGetToken()).then(token=>{
      return fetch(firebaseUrl + '/places/'+key+'.json?auth='+token,{
        method: 'DELETE'
      })
    })
    .then(
      res => res.json()
    ).then(
      resParse => {
        dispatch(deletePlace(key))
      }
    ).catch(
      err =>{
        console.log(err)
      }
    )
  }
}

export const deletePlace = key => {
  return {type: DELETE_PLACE, placeKey: key}
}