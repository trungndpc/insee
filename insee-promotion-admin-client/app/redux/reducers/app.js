import * as type from '../actions/action-types'

const initialState = {
  register: {
    step: 1,
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
      break;
    }
    case type.APP.CHECK_PHONE_END: {
      newState.register = {...newState.register}
      let error = action.payload;
      newState.register.statusStep1 = error;
      newState.register.isLoading = false;
      break;
    }
    case type.APP.REGISTER_START: {
      break;
    }
    case type.APP.REGISTER_END: {
      break
    }
    case type.APP.PUSH_STATE_REGISTER: {
      let data = action.payload;
      newState.register = {...newState.register}
      data.forEach(function(item) {
        newState.register[item.name] = item.value;
      })
      break;
    }

    case type.APP.GET_CUSTOMER_BY_ID_END: {
      let data = action.payload;
      newState.customer = data;
      break;
    }

    case type.APP.GET_LIST_PROMOTION_END: {
      let data = action.payload;
      newState.promotions = data;
      break;
    }

    case type.APP.GET_PROMOTION_BY_ID_END: {
      let data = action.payload;
      newState.promotion = data;
      break;
    }

    case type.APP.LOGIN_START: {
      break;
    }

    case type.APP.LOGIN_END: {
      let resp = action.payload;
      if (resp.error < 0) {
        newState.errorMsg = "Sai SDT hoặc mật khẩu"
      }
      break;
    }
    case type.APP.GET_PROFILE_START: {
      break;
    }
    case type.APP.GET_PROFILE_END: {
      let data = action.payload;
      newState.user = data;
      break;
    }
    case type.APP.GET_LIST_CUSTOMER_ALL_START: {
      newState.customers = null
      break;
    }
    case type.APP.GET_LIST_CUSTOMER_ALL_END: {
      let data = action.payload;
      newState.customers = data;
      break;
    }
    case type.APP.GET_LIST_CUSTOMER_BY_STATUS_START: {
      newState.customers = null
      break;
    }
    case type.APP.GET_LIST_CUSTOMER_BY_STATUS_END: {
      let data = action.payload;
      newState.customers = data;
      break;
    }
    default:
      return state
  }
  return newState
}
