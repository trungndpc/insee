import * as type from '../actions/action-types'

const initialState = {
  register: {
    step: 1
  }
 
}

export default function app(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.PUSH_DATA_REGISTER: {
      newState.register = action.data;
      break
    }
    case type.APP.CHECK_PHONE_START: {
      console.log("CHECK_PHONE_START")
      break;
    }
    case type.APP.CHECK_PHONE_END: {
      console.log("CHECK_PHONE_END: " + action.payload);
      let error = action.payload;
      newState.register.statusStep1 = error;
      break;
    }
    case type.APP.REGISTER_START: {
      console.log("REGISTER_START");
      break;
    }
    case type.APP.REGISTER_END: {
      console.log("REGISTER_END: " + action.payload);
      break
    }
    case type.APP.PUSH_STATE_REGISTER: {
      console.log("PUSH_STATE_REGISTER: " + action.payload);
      let data = action.payload;
      newState.register = {...newState.register}
      data.forEach(function(item) {
        newState.register[item.name] = item.value;
      })
      break;
    }
    default:
      return state
  }
  return newState
}
