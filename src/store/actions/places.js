
import {ADD_PLACE, DELETE_PLACE } from './actionTypes';


export const addPlace = (placeName, location, image) => {
  return {
    type: ADD_PLACE,
    placeName,
    location,
    image
  }
}

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  }
}

