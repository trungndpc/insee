import { takeLatest, call, put, take } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'


export default function* app() {
  yield takeLatest(type.APP.GET_PROFILE_USER_ASYNC, getProfileAsync)
}

function* getProfileAsync() {
  yield put({ type: type.APP.GET_PROFILE_USER_START })
  const resp = yield call(getProfile)
  yield put({ type: type.APP.GET_PROFILE_USER_END, payload: resp.data })
}

function getProfile() {
  return new Promise((resolve, reject) => {
    APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/user`, resolve, reject);
  });
}
