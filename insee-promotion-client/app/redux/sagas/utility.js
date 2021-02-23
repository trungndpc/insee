import { takeLatest, call, put, take } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'


export default function* utility() {
    yield takeLatest(type.APP.GET_MSG_C02_ASYNC, getMsgC02Async)
}

//getMsgC02Async
function* getMsgC02Async(action) {
    const resp = yield call(getMsgC02, action.productId, action.bags);
    yield put({ type: type.APP.GET_MSG_C02_END, payload: resp.data })
}

function getMsgC02(productId, bags) {
    return new Promise((resolve, reject) => {
        APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/utility/co2?productId=${productId}&bags=${bags}`, resolve, reject);
    });
}