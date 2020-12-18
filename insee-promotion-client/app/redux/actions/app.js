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