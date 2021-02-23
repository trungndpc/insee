import * as type from '../actions/action-types'

const initialState = {
  
}

export default function utility(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.GET_MSG_C02_END: {
      newState.co2 = action.payload;
      break
    }
    default:
      return state
  }
  return newState
}
