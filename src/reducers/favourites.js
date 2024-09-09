import {
  ADD_TO_FAVOURITE,
  LOAD_FAVOURITES,
  REMOVE_FROM_FAVOURITE,
} from '../actions/types'

// initial states
const initialState = { favourites: [] }

// reducer for handling favourite states
export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_TO_FAVOURITE:
      return { ...state, favourites: payload }
    case REMOVE_FROM_FAVOURITE:
      return {
        ...state,
        favourites: payload,
      }
    case LOAD_FAVOURITES:
      return {
        ...state,
        favourites: payload,
      }
    default:
      return state
  }
}
