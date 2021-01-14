/**
 * Chứa các tên action để dispatch cho reducer hoặc Saga
 */

/**
 ****** APP ACTIONS ******
 **/
export const APP = {
  PUSH_DATA_REGISTER : 'PUSH_DATA_REGISTER',

  CHECK_PHONE_START: 'CHECK_PHONE_START',
  CHECK_PHONE_ASYNC: 'CHECK_PHONE_ASYNC',
  CHECK_PHONE_END: 'CHECK_PHONE_END',

  UPDATE_CUSTOMER_START: 'UPDATE_CUSTOMER_START',
  UPDATE_CUSTOMER_ASYNC: 'UPDATE_CUSTOMER_ASYNC',
  UPDATE_CUSTOMER_END: 'UPDATE_CUSTOMER_END',

  PUSH_STATE_REGISTER: 'PUSH_STATE_REGISTER',

  GET_CUSTOMER_START: 'GET_CUSTOMER_START',
  GET_CUSTOMER_ASYNC: 'GET_CUSTOMER_ASYNC',
  GET_CUSTOMER_END: 'GET_CUSTOMER_END',

  GET_PROMOTION_BY_ID_START: 'GET_PROMOTION_BY_ID_START',
  GET_PROMOTION_BY_ID_ASYNC: 'GET_PROMOTION_BY_ID_ASYNC',
  GET_PROMOTION_BY_ID_END: 'GET_PROMOTION_BY_ID_END',

  GET_LIST_PROMOTION_START: 'GET_LIST_PROMOTION_START',
  GET_LIST_PROMOTION_ASYNC: 'GET_LIST_PROMOTION_ASYNC',
  GET_LIST_PROMOTION_END: 'GET_LIST_PROMOTION_END',

  LOGIN_ASYNC_START: 'LOGIN_ASYNC_START',
  LOGIN_ASYNC_ASYNC: 'LOGIN_ASYNC_ASYNC',
  LOGIN_ASYNC_END: 'LOGIN_ASYNC_END',

  LOGIN_PASSWORD_START: 'LOGIN_PASSWORD_START',
  LOGIN_PASSWORD_ASYNC: 'LOGIN_PASSWORD_ASYNC',
  LOGIN_PASSWORD_END: 'LOGIN_PASSWORD_END',

  OFF_LOADING: 'OFF_LOADING',
  ON_LOADING: 'ON_LOADING',

  GET_PROFILE_USER_START: 'GET_PROFILE_USER_START',
  GET_PROFILE_USER_ASYNC: 'GET_PROFILE_USER_ASYNC',
  GET_PROFILE_USER_END: 'GET_PROFILE_USER_END',

  PUSH_CONTRUCTION_START: 'PUSH_CONTRUCTION_START',
  PUSH_CONTRUCTION_ASYNC: 'PUSH_CONTRUCTION_ASYNC',
  PUSH_CONTRUCTION_END: 'PUSH_CONTRUCTION_END',

  GET_LIST_CONSTRUCTION_START: 'GET_LIST_CONSTRUCTION_START',
  GET_LIST_CONSTRUCTION_ASYNC: 'GET_LIST_CONSTRUCTION_ASYNC',
  GET_LIST_CONSTRUCTION_END: 'GET_LIST_CONSTRUCTION_END',

  GET_CONSTRUCTION_START: 'GET_CONSTRUCTION_START',
  GET_CONSTRUCTION_ASYNC: 'GET_CONSTRUCTION_ASYNC',
  GET_CONSTRUCTION_END: 'GET_CONSTRUCTION_END',

  GET_LIST_HISTORY_GIFT_START : 'GET_LIST_HISTORY_GIFT_START',
  GET_LIST_HISTORY_GIFT_ASYNC : 'GET_LIST_HISTORY_GIFT_ASYNC',
  GET_LIST_HISTORY_GIFT_END: 'GET_LIST_HISTORY_GIFT_END'

  
}
