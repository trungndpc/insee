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

export function register(data) {
  return {
    type: type.APP.REGISTER_ASYNC,
    data: data
  }
}

export function getCustomerById(id) {
  return {
    type: type.APP.GET_CUSTOMER_BY_ID_ASYNC,
    id: id
  }
}

export function getListPromotion() {
  return {
    type: type.APP.GET_LIST_PROMOTION_ASYNC
  }
}

export function createPromotion(data) {
  return {
    type: type.APP.CREATE_PROMOTION_ASYNC,
    data: data
  }
}

export function getPromotionById(id) {
  return {
    type: type.APP.GET_PROMOTION_BY_ID_ASYNC,
    id: id
  }
} 