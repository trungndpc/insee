import * as type from '../actions/action-types'

const initialState = {
  register: {
    step: 4,
    isLoading: false
  },
 
}

export default function app(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.PUSH_DATA_REGISTER: {
      newState.register = {...newState.register}
      newState.register = action.data;
      break
    }
    case type.APP.CHECK_PHONE_START: {
      newState.register = {...newState.register}
      newState.register.isLoading = true;
      console.log("CHECK_PHONE_START")
      break;
    }
    case type.APP.CHECK_PHONE_END: {
      console.log("CHECK_PHONE_END: " + action.payload);
      newState.register = {...newState.register}
      let error = action.payload;
      newState.register.statusStep1 = error;
      newState.register.isLoading = false;
      break;
    }
    case type.APP.REGISTER_START: {
      console.log("REGISTER_START");
      break;
    }
    case type.APP.REGISTER_END: {
      console.log("REGISTER_END: " + action.payload);
      newState.register = {...newState.register}
      newState.register.customer = action.payload;
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

    case type.APP.GET_CUSTOMER_BY_ID_END: {
      console.log("GET_CUSTOMER_BY_ID_END: " + action.payload);
      let data = action.payload;
      newState.customer = data;
      break;
    }

    case type.APP.GET_LIST_PROMOTION_END: {
      console.log("GET_LIST_PROMOTION_END: " + action.payload);
      let data = action.payload;
      newState.promotions = data;
      break;
    }

    case type.APP.GET_PROMOTION_BY_ID_END: {
      console.log("GET_PROMOTION_BY_ID_END: " + action.payload);
      let data = action.payload;
      newState.promotion = data;
      break;
    }
    default:
      return state
  }
  return newState
}
