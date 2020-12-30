import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'
import AlertUtils from '../../utils/AlertUtils'
import AppUtils from '../../utils/AppUtils'

export default function* customer() {
  yield takeLatest(type.APP.CHECK_PHONE_ASYNC, checkPhoneAsync)
  yield takeLatest(type.APP.REGISTER_ASYNC, registerCustomerAsync)
  yield takeLatest(type.APP.GET_CUSTOMER_BY_ID_ASYNC, getCustomerByIdAsync)
  yield takeLatest(type.APP.GET_LIST_PROMOTION_ASYNC, getListPromotionAsync)
  yield takeLatest(type.APP.CREATE_PROMOTION_ASYNC, createPromotionAsync)
  yield takeLatest(type.APP.GET_PROMOTION_BY_ID_ASYNC, getPromotionByIdAsync)
  yield takeLatest(type.APP.LOGIN_ASYNC, loginAsync)
  yield takeLatest(type.APP.GET_PROFILE_ASYNC, getProfileAsync)
  yield takeLatest(type.APP.GET_LIST_CUSTOMER_ALL_ASYNC, getListCustomerAllAsync)
  yield takeLatest(type.APP.GET_LIST_CUSTOMER_BY_STATUS_ASYNC, getListCustomerByStatusAsync)
}


//Check phone
function* checkPhoneAsync(action) {
  yield put({ type: type.APP.CHECK_PHONE_START })
  const resp = yield call(postCheckPhone, action.phone)
  let data = []
  if (resp.error == 0) {
    data = [
      {
        name: "step",
        value: 2
      },
      {
        name: "phone",
        value: action.phone
      }
    ]
  } else {
    data = [
      {
        name: "statusStep1",
        value: resp.error
      }
    ]
  }
  yield put({ type: type.APP.PUSH_STATE_REGISTER, payload: data })
  yield put({ type: type.APP.CHECK_PHONE_END, payload: resp.error })
}


function postCheckPhone(phone) {
  var body = {
    phone: phone
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/customer/check-phone`, JSON.stringify(body), resolve, reject);
  });
}

//Register customer
function* registerCustomerAsync(action) {
  yield put({ type: type.APP.REGISTER_START })
  const resp = yield call(postRegisterCustomer, action.data)
  let data = [];
  if (resp.error == 0) {
    data = [{ name: "statusStep3", value: 0 }, { name: "step", value: 4 }]
  } else {
    data = [{ name: "statusStep3", value: resp.error }]
  }
  yield put({ type: type.APP.PUSH_STATE_REGISTER, payload: data })
  yield put({ type: type.APP.REGISTER_END, payload: resp.error })
}

function postRegisterCustomer(data) {
  console.log(data)
  var body = {
    phone: data["phone"],
    birthday: data["birthday"],
    mainAreaId: 1,
    pass: data["password"],
    fullName: data["name"],
    avatar: "https://s120-ava-talk.zadn.vn/f/f/a/9/10/120/87069ccaa43702ad56ec93fe5a75f24f.jpg",
    idToken: data["idToken"]
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/customer/register`, JSON.stringify(body), resolve, reject);
  });
}

//Get customer by id
function* getCustomerByIdAsync(action) {
  yield put({ type: type.APP.GET_CUSTOMER_BY_ID_START })
  const resp = yield call(getCustomerById, action.id)
  yield put({ type: type.APP.GET_CUSTOMER_BY_ID_END, payload: resp.data })
}

function getCustomerById(id) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/customer?id=` + id, resolve, reject);
  });
}

//Get list promotion 

function* getListPromotionAsync(action) {
  yield put({ type: type.APP.GET_LIST_PROMOTION_START })
  const resp = yield call(getPromotion)
  yield put({ type: type.APP.GET_LIST_PROMOTION_END, payload: resp.data })

}

function getPromotion() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/post/list`, resolve, reject);
  });
}


//create promotion 
function* createPromotionAsync(action) {
  yield put({ type: type.APP.CREATE_PROMOTION_START })
  const resp = yield call(postToCreatePromotion, action.data)
  if (resp.error == 0) {
    AlertUtils.showSuccess(AlertUtils.CREATE_PROMOTION_SUCCESS)
    yield put({ type: type.APP.CREATE_PROMOTION_END, payload: resp.data })
    AppUtils.push("/promotion")
  } else {
    AlertUtils.showError(AlertUtils.CREATE_PROMOTION_FAILED)
  }
}

function postToCreatePromotion(data) {
  console.log(data)
  var body = {
    title: data.title,
    subTitle: data.title,
    summary: data.summary,
    content: data.content,
    typePromotion: 1
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/post/create`, JSON.stringify(body), resolve, reject);
  });
}

// get promotion by id
function* getPromotionByIdAsync(action) {
  yield put({ type: type.APP.GET_PROMOTION_BY_ID_START })
  const resp = yield call(getPromotionById, action.id)
  yield put({ type: type.APP.GET_PROMOTION_BY_ID_END, payload: resp.data})
}

function getPromotionById(id) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/post?id=` + id, resolve, reject);
  });
}

//loginAsync 

function* loginAsync(action) {
  yield put({type: type.APP.LOGIN_START})
  const resp = yield call(postLogin, action.data)
  if (resp.error == 0) {
    AppUtils.push("/")
  }
  yield put({type: type.APP.LOGIN_END, payload: resp})
}

function postLogin(data) {
  var body = {
      phone: data["phone"],
      pass: data["pass"]
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/admin/authen/login`, JSON.stringify(body), resolve, reject);
  });
}

//getProfileAsync 

function* getProfileAsync() {
  yield put({type: type.APP.GET_PROFILE_START})
  const resp = yield call(getProfile)
  yield put({type: type.APP.GET_PROFILE_END, payload: resp.data})
}

function getProfile() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/admin/authen/profile`, resolve, reject);
  });
}

//getListCustomerAllAsync 
function* getListCustomerAllAsync(action) {
  yield put({type: type.APP.GET_LIST_CUSTOMER_ALL_START})
  const resp = yield call(getListCustomerAll, action.page, action.pageSize)
  yield put({type: type.APP.GET_LIST_CUSTOMER_ALL_END, payload: resp.data})
}

function getListCustomerAll(page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/customer/list?page=${page}&pageSize=${pageSize}`, resolve, reject);
  });
}

//getListCustomerByStatus

function* getListCustomerByStatusAsync(action) {
  yield put({type: type.APP.GET_LIST_CUSTOMER_BY_STATUS_START})
  const resp = yield call(getListCustomerByStatus, action.status, action.page, action.pageSize)
  yield put({type: type.APP.GET_LIST_CUSTOMER_BY_STATUS_END, payload: resp.data})
}

function getListCustomerByStatus(status, page, pageSize) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/customer/find-by?page=${page}&pageSize=${pageSize}&status=${status}`, resolve, reject);
  });
}