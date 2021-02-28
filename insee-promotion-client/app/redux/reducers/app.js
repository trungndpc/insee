import * as type from '../actions/action-types'

const initialState = {
  isLoading: false,
  register: {
    step: window.register && window.register.step,
    isLoading: false
  },
  nextContruction: null,
  promotion: null
}

export default function app(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case type.APP.PUSH_DATA_REGISTER: {
      newState.register = { ...newState.register }
      newState.register = action.data;
      break
    }
    case type.APP.CHECK_PHONE_START: {
      break;
    }
    case type.APP.CHECK_PHONE_END: {
      newState.register = { ...newState.register }
      newState.register = { ...newState.register }
      newState.register.error = action.payload;
      if (newState.register.error != 0) {
        newState.isLoading = false;
      }
      break;
    }
    case type.APP.UPDATE_CUSTOMER_START: {
      newState.isLoading = true;
      break;
    }
    case type.APP.UPDATE_CUSTOMER_END: {
      newState.isLoading = false;
      newState.register = { ...newState.register }
      newState.register.customer = action.payload;
      break
    }
    case type.APP.PUSH_STATE_REGISTER: {
      newState.register = { ...newState.register }
      newState.register.step = action.payload;
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

    case type.APP.GET_LIST_PROMOTION_START: {
      newState.promotion = null;
      break;
    }

    case type.APP.GET_LIST_PROMOTION_END: {
      let resp = action.payload;
      let promotion = { ...newState.promotion }
      promotion.error = resp.error;
      promotion.list = resp.data;
      newState.promotion = promotion;
      break;
    }
    case type.APP.GET_PROMOTION_BY_ID_START: {
      newState.promotion = null;
      break;
    }
    case type.APP.GET_PROMOTION_BY_ID_END: {
      let resp = action.payload;
      let promotion = { ...newState.promotion }
      promotion.error = resp.error;
      promotion.one = resp.data;
      newState.promotion = promotion;
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
    case type.APP.PUSH_CONTRUCTION_START: {
      newState.isLoading = true;
      break;
    }
    case type.APP.PUSH_CONTRUCTION_END: {
      newState.isLoading = false;
      newState.crateedContruction = true;
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
    case type.APP.GET_GIFT_BY_ID_START: {
      newState.gift = null;
      break;
    }
    case type.APP.GET_GIFT_BY_ID_END: {
      newState.gift = action.payload;
      break;
    }
    default:
      return state
  }
  return newState
}
