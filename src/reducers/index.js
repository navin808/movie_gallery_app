import { combineReducers } from 'redux'
import trending from './trending'
import favourites from './favourites'


// combining all the reducers
export default combineReducers({
  trending,
  favourites,
  
})
