import * as type from '../actions/action-types'

const initialState = {
  isLoading: false,
  register: {
    step: 1,
    isLoading: false
  },
  nextContruction: null
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
      newState.isLoading = true;
      break;
    }
    case type.APP.CHECK_PHONE_END: {
      newState.register = {...newState.register}
      let error = action.payload;
      if (error != 0) {
        newState.isLoading = false;
      }
      newState.register.statusStep1 = error;
      break;
    }
    case type.APP.UPDATE_CUSTOMER_START: {
      newState.isLoading = true;
      break;
    }
    case type.APP.UPDATE_CUSTOMER_END: {
      newState.isLoading = false;
      newState.register = {...newState.register}
      newState.register.customer = action.payload;
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
    case type.APP.GET_CUSTOMER_START: {
      newState.isLoading = true;
      break;
    }
    case type.APP.GET_CUSTOMER_END: {
      newState.isLoading = false;
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
    case type.APP.LOGIN_PASSWORD_START: {
      newState.isLoading = true;
      break;
    }
    case type.APP.LOGIN_PASSWORD_END: {
      newState.isLoading = false;
      let data = action.payload;
      if (data.error != 0) {
        newState.loginPassErrorMsg = "SDT hoặc mật khẩu không đúng"
      }
      break;
    }
    case type.APP.ON_LOADING: {
      newState.isLoading = true;
      break;
    }
    case type.APP.OFF_LOADING: {
      newState.isLoading = false;
      break;
    }
    case type.APP.LOGIN_ASYNC_START: {
      newState.isLoading = true;
      break;
    }
    case type.APP.LOGIN_ASYNC_END: {
      newState.isLoading = false;
      break;
    }
    case type.APP.GET_PROFILE_USER_START: {
      break;
    }
    case type.APP.GET_PROFILE_USER_END: {
      newState.user = action.payload;
      break;
    }
    case type.APP.PUSH_CONTRUCTION_START:{
      newState.isLoading = true;
      break;
    }
    case type.APP.PUSH_CONTRUCTION_END: {
      newState.isLoading = false;
      newState.crateedContruction = action.payload;
      break;
    }
    case type.APP.GET_LIST_CONSTRUCTION_START: {
      break;
    }
    case type.APP.GET_LIST_CONSTRUCTION_END: {
      newState.constructions = action.payload;
      break;
    }
    case type.APP.GET_CONSTRUCTION_START: {
      break;
    }
    case type.APP.GET_CONSTRUCTION_END: {
      newState.construction = action.payload;
      break;
    }
    case type.APP.GET_LIST_HISTORY_GIFT_START: {
      break;
    }
    case type.APP.GET_LIST_HISTORY_GIFT_END: {
      newState.gifts = action.payload;
      break;
    }
    default:
      return state
  }
  return newState
}
