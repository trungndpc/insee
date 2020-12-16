import * as type from '../actions/action-types'

const initialState = {
 
}

export default function app(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.PUSH_DATA_REGISTER: {
      newState.register = action.data;
      break
    }
    default:
      return state
  }
  return newState
}
