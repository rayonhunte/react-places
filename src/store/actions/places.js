
import {ADD_PLACE, DELETE_PLACE } from './actionTypes';


const firebaseUrl = "https://rncourse-1514244841127.firebaseio.com/"

export const addPlace = (placeName, location, image) => {
  return dispatch =>{
    const placeData = {
      name: placeName,
      location, 
    }
    fetch(firebaseUrl+'/places.json',{
      method: "POST",
      body: JSON.stringify(
        placeData
      )
    }).then( res=> res.json).then(parseRes =>{
      console.log(parseRes)
    }).catch((error)=>{
      console.log(error)
    })
  }
}

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  }
}

