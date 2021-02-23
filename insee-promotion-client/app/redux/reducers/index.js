import { combineReducers } from 'redux'
import app from './app'
import utility from './utility'

import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  app,
  utility,
  routing: routerReducer
})

export default rootReducer
