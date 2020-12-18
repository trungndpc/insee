import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'


export default function* customer() {
  yield takeLatest(type.APP.CHECK_PHONE_ASYNC, checkPhoneAsync)
  yield takeLatest(type.APP.REGISTER_ASYNC, registerCustomerAsync)
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
  // yield put({ type: type.APP.CHECK_PHONE_END, payload: resp.error })
}


function postCheckPhone(phone) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        error: 0
      })
    }, 1000)
  })
}

//Register customer
function* registerCustomerAsync(action) {
  yield put({ type: type.APP.REGISTER_START })
  const resp = yield call(postRegisterCustomer, action.data)
  let data = [];
  if (resp.error == 0) {
    data = [{name: "statusStep3", value: 0}, {name: "step", value: 4}]
  }else {
    data = [{name: "statusStep3", value: resp.error}]
  }
  yield put({ type: type.APP.PUSH_STATE_REGISTER, payload: data })
  yield put({ type: type.APP.REGISTER_END, payload: resp.error })
}

function postRegisterCustomer(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        error: 0
      })
    }, 1000)
  })
}