import {ADD_PLACE, DELETE_PLACE, SET_PLACES} from './actionTypes';
import {uiStartLoading, uiStopLoading} from './index';

const firebaseUrl = "https://rncourse-1514244841127.firebaseio.com/"
const storeUrl = "https://us-central1-rncourse-1514244841127.cloudfunctions.net/storeImage/"
export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(storeUrl, {
      method: "POST",
      body: JSON.stringify({image: image.base64})
    }).catch(err => {
      console.log(err)
      alert("Something went wrong")
      dispatch(uiStopLoading())
    })
      .then(res => res.json())
      .then(parseRes => {
        const placeData = {
          name: placeName,
          location,
          image: parseRes.imageUrl
        };
        return fetch(firebaseUrl + '/places.json', {
            method: "POST",
            body: JSON.stringify(placeData)
          })
          .then(res => res.json())
          .then(parseRes => {
            dispatch(uiStopLoading())
          })
          .catch(err => {
            console.log(err)
            alert("Something went wrong")
            dispatch(uiStopLoading())
          })
      })
  }
}

export const getPlaces = () =>{
  return dispatch =>{
    fetch(firebaseUrl + '/places.json')
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

export const deletePlace = key => {
  return {type: DELETE_PLACE, placeKey: key}
}