import axios from 'axios'

import { TRENDING_SUCCESS, TRENDING_FAIL } from './types'

// action for fetching data for trending page
export const fetchTrending = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MY_TMDB_API_KEY}&page=${page}`
    )
    dispatch({
      type: TRENDING_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    const errors = err
    dispatch({
      type: TRENDING_FAIL,
      payload: errors,
    })
  }
}
