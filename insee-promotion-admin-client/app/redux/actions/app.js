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

export function login(data) {
  return {
    type: type.APP.LOGIN_ASYNC,
    data: data
  }
}

export function getProfile() {
  return {
    type: type.APP.GET_PROFILE_ASYNC
  }
}

export function getListCustomerAll(page, pageSize) {
  return {
    type: type.APP.GET_LIST_CUSTOMER_ALL_ASYNC,
    page: page,
    pageSize: pageSize
  }
}

export function getListCustomerByStatus(status, page, pageSize) {
  return {
    type: type.APP.GET_LIST_CUSTOMER_BY_STATUS_ASYNC,
    page: page,
    pageSize: pageSize,
    status : status
  }
}

export function updateStatusCustomer(id, status, note) {
  return {
    type: type.APP.UPDATE_STATUS_CUSTOMER_ASYNC,
    id: id,
    status: status,
    note: note
  }
}

export function getListConstruction(data) {
  return {
    type: type.APP.GET_LIST_CONSTRUCTION_ASYNC,
    data: data
  }
}

export function getConstruction(id) {
  return {
    type: type.APP.GET_CONSTRUCTION_ASYNC,
    id: id
  }
}

export function updateStatusImage(imageId, imgType, status, id) {
  return {
    type: type.APP.UPDATE_STATUS_IMAGE_ASYNC,
    imgType: imgType,
    status: status,
    id: id,
    imageId: imageId
  }
}

export function updateStatusConstruction(id, status) {
  return {
    type: type.APP.UPDATE_STATUS_CONSTRUCTION_ASYNC,
    id: id,
    status : status
  }
}