import { takeLatest, call, put, take } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'


export default function* customer() {
  yield takeLatest(type.APP.CHECK_PHONE_ASYNC, checkPhoneAsync)
  yield takeLatest(type.APP.UPDATE_CUSTOMER_ASYNC, updateCustomerAsync)
  yield takeLatest(type.APP.GET_CUSTOMER_ASYNC, getCustomerAsync)
  yield takeLatest(type.APP.GET_LIST_PROMOTION_ASYNC, getListPromotionAsync)
  yield takeLatest(type.APP.GET_PROMOTION_BY_ID_ASYNC, getPromotionByIdAsync)
  yield takeLatest(type.APP.LOGIN_ASYNC_ASYNC, loginAsync)
  yield takeLatest(type.APP.LOGIN_PASSWORD_ASYNC, loginWithPassAsync)
  yield takeLatest(type.APP.GET_PROFILE_USER_ASYNC, getProfileAsync)
  yield takeLatest(type.APP.PUSH_NEXT_CONTRUCTION_ASYNC, pushNextContructionAsync)
  yield takeLatest(type.APP.GET_LIST_CONSTRUCTION_ASYNC, getListConstructionAsync)
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
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/authen/check-phone`, JSON.stringify(body), resolve, reject);
  });
}

//updateCustomerAsync
function* updateCustomerAsync(action) {
  yield put({ type: type.APP.UPDATE_CUSTOMER_START })
  const resp = yield call(postUpdateCustomer, action.data)
  let data = [];
  if (resp.error == 0) {
    data = [{ name: "statusStep3", value: 0 }, { name: "step", value: 4 }]
  } else {
    data = [{ name: "statusStep3", value: resp.error }]
  }
  yield put({ type: type.APP.PUSH_STATE_REGISTER, payload: data })
  yield put({ type: type.APP.UPDATE_CUSTOMER_END, payload: resp.data })
}

function postUpdateCustomer(data) {
  var body = {
    phone: data["phone"],
    mainAreaId: data["location"],
    pass: data["password"],
    fullName: data["name"],
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/customer/update`, JSON.stringify(body), resolve, reject);
  });
}

//Get customer by id
function* getCustomerAsync(action) {
  yield put({ type: type.APP.GET_CUSTOMER_START })
  const resp = yield call(getCustomer)
  yield put({ type: type.APP.GET_CUSTOMER_END, payload: resp.data })
}

function getCustomer() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/customer/profile`, resolve, reject);
  });
}

// get promotion by id
function* getPromotionByIdAsync(action) {
  yield put({ type: type.APP.GET_PROMOTION_BY_ID_START })
  const resp = yield call(getPromotionById, action.id)
  yield put({ type: type.APP.GET_PROMOTION_BY_ID_END, payload: resp.data })
}

function getPromotionById(id) {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/admin/post?id=` + id, resolve, reject);
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


//loginAsync 

function* loginAsync(action) {
  yield put({ type: type.APP.LOGIN_ASYNC_START })
  const resp = yield call(loginWithPhoneSMS, action.data)
  if (resp.error == 0) {
    let data = [{ name: "statusStep2", value: 0 }, { name: "step", value: 3 }]
    yield put({ type: type.APP.PUSH_STATE_REGISTER, payload: data })
  } else {
    let data = [{ name: "statusStep2", value: resp.error }]
    yield put({ type: type.APP.PUSH_STATE_REGISTER, payload: data })
  }
  yield put({ type: type.APP.LOGIN_ASYNC_END, payload: resp.data })
}

function loginWithPhoneSMS(data) {
  var body = {
    phone: data["phone"],
    idToken: data["idToken"]
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/authen/login`, JSON.stringify(body), resolve, reject);
  });
}

//loginWithPassAsync

function* loginWithPassAsync(action) {
  yield put({ type: type.APP.LOGIN_PASSWORD_START })
  const resp = yield call(loginWithPass, action.data)
  if (resp.error == 0) {
    window.pushHistory("/khach-hang");
  }
  yield put({ type: type.APP.LOGIN_PASSWORD_END, payload: resp })
}

function  loginWithPass(data) {
  var body = {
    phone: data["phone"],
    pass: data["pass"]
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/authen/login-pass`, JSON.stringify(body), resolve, reject);
  });
}

function* getProfileAsync() {
  yield put({ type: type.APP.GET_PROFILE_USER_START })
  const resp = yield call(getProfile)
  if (resp.error < 0) {
    window.pushHistory("/dang-nhap");
  }
  yield put({ type: type.APP.GET_PROFILE_USER_END, payload: resp.data })
}

function getProfile() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/user/profile`, resolve, reject);
  });
}

//pushNextContructionAsync

function* pushNextContructionAsync(action) {
  yield put({ type: type.APP.PUSH_NEXT_CONTRUCTION_START })
  const resp = yield call(postContruction, action.data)
  yield put({ type: type.APP.PUSH_NEXT_CONTRUCTION_END, payload: resp.data })
}

function postContruction(data) {
  var body = {
    address: data["address"],
    city: data["city"],
    district: data["district"],
    name: data["name"],
    phone: data["phone"],
    estimateTimeStart: data["timeStart"],
    typeConstruction: data["typeProject"],
    type: data["type"]
  }
  return new Promise((resolve, reject) => {
    APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/construction/create`, JSON.stringify(body), resolve, reject);
  });
}

//getListConstructionAsync

function* getListConstructionAsync() {
  console.log("getListConstructionAsync")
  yield put({ type: type.APP.GET_LIST_CONSTRUCTION_START })
  const resp = yield call(getListConstruction)
  console.log("oooooooooooooooo")
  yield put({ type: type.APP.GET_LIST_CONSTRUCTION_END, payload: resp.data })
}

function getListConstruction() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/construction/me`, resolve, reject);
  });
}