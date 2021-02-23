/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function pushRegisterData(data) {
  return {
    type: type.APP.PUSH_DATA_REGISTER,
    data: data
  }
}

export function checkPhone(phone) {
  return {
    type: type.APP.CHECK_PHONE_ASYNC,
    phone: phone
  }
}

export function updateCustomer(data) {
  return {
    type: type.APP.UPDATE_CUSTOMER_ASYNC,
    data: data
  }
}

export function getCustomer() {
  return {
    type: type.APP.GET_CUSTOMER_ASYNC,
  }
}

export function getListPromotion() {
  return {
    type: type.APP.GET_LIST_PROMOTION_ASYNC
  }
}

export function getPromotionById(id) {
  return {
    type: type.APP.GET_PROMOTION_BY_ID_ASYNC,
    id: id
  }
}

export function loginWithPhone(data) {
  return {
    type: type.APP.LOGIN_ASYNC_ASYNC,
    data: data
  }
}

export function loginWithPass(data) {
  return {
    type: type.APP.LOGIN_PASSWORD_ASYNC,
    data: data
  }
}

export function setStatusLoading(is) {
  if (is) {
    return { type: type.APP.ON_LOADING }
  } else {
    return { type: type.APP.OFF_LOADING }
  }
}

export function getProfile() {
  return {
    type: type.APP.GET_PROFILE_USER_ASYNC
  }
}

export function createNextContruction(data) {
  return {
    type: type.APP.PUSH_CONTRUCTION_ASYNC,
    data: data
  }
}

export function getListConstruction() {
  return {
    type: type.APP.GET_LIST_CONSTRUCTION_ASYNC
  }
}

export function getConstructionById(id) {
  return {
    type: type.APP.GET_CONSTRUCTION_ASYNC,
    id: id
  }
}

export function getHistoryGift() {
  return {
    type: type.APP.GET_LIST_HISTORY_GIFT_ASYNC
  }
}

export function getGiftById(id) {
  return {
    type: type.APP.GET_GIFT_BY_ID_ASYNC,
    id: id
  }
}

export function receivedGift(id) {
  return {
    type: type.APP.RECIEVED_GIFT_BY_ID_ASYNC,
    id: id
  }
}

export function getMsgC02(productId, bags) {
  return {
    type: type.APP.GET_CONSTRUCTION_ASYNC,
    productId: productId,
    bags: bags
  }
}