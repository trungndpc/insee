import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'


export default function* customer() {
  yield takeLatest(type.APP.CHECK_PHONE_ASYNC, checkPhoneAsync)
  yield takeLatest(type.APP.REGISTER_ASYNC, registerCustomerAsync)
  yield takeLatest(type.APP.GET_CUSTOMER_BY_ID_ASYNC, getCustomerByIdAsync)
  yield takeLatest(type.APP.GET_LIST_PROMOTION_ASYNC, getListPromotionAsync)
  yield takeLatest(type.APP.GET_PROMOTION_BY_ID_ASYNC, getPromotionByIdAsync)
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
  yield put({ type: type.APP.REGISTER_END, payload: resp.data })
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
    APIUtils.getJSONWithoutCredentials(process.env.DOMAIN + `/api/customer/?id=` + id, resolve, reject);
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
