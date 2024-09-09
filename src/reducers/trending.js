import { TRENDING_SUCCESS, TRENDING_FAIL } from '../actions/types'

// initial states of trending page
const initialState = {
  trendings: {},
}

// reducer for updating state of trending page
export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case TRENDING_SUCCESS:
      return {
        ...state,
        trendings: payload,
      }

    case TRENDING_FAIL:
      return {
        ...state,
        trendings: {},
      }

    default:
      return state
  }
}
