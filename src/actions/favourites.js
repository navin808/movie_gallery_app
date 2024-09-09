import axios from 'axios'

import {
  ADD_TO_FAVOURITE,
  LOAD_FAVOURITES,
  REMOVE_FROM_FAVOURITE,
} from './types'

// action for adding to favourites
export const addToFavourite = (item) => async (dispatch) => {
  let allFavs = JSON.parse(localStorage.getItem('Favourite')) || []

  let newAllFavs = [...allFavs, item]
  localStorage.setItem('Favourite', JSON.stringify(newAllFavs))
  dispatch({
    type: ADD_TO_FAVOURITE,
    payload: newAllFavs,
  })
}

// action for removing from favourites
export const removeFromFavourite = (item) => async (dispatch) => {
  let allFavs = JSON.parse(localStorage.getItem('Favourite')) || []

  let newAllFavs = allFavs.filter((fav) => fav.id != item.id)
  localStorage.setItem('Favourite', JSON.stringify(newAllFavs))
  dispatch({
    type: REMOVE_FROM_FAVOURITE,
    payload: newAllFavs,
  })
}

// action for loading favourites from localStorage
export const loadFavourites = (item) => async (dispatch) => {
  let allFavs = JSON.parse(localStorage.getItem('Favourite')) || []
  dispatch({
    type: LOAD_FAVOURITES,
    payload: allFavs,
  })
}
