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