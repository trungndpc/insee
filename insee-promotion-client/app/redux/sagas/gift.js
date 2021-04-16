import { takeLatest, call, put, take } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import GiftModel from '../../model/GiftModel'

export default function* gift() {
    yield takeLatest(type.APP.GET_LIST_HISTORY_GIFT_ASYNC, getListHistoryGiftAsync)
    yield takeLatest(type.APP.GET_GIFT_BY_ID_ASYNC, getGiftByIdAsync)
    yield takeLatest(type.APP.RECIEVED_GIFT_BY_ID_ASYNC, recievedGiftByIdAsync)
}


//getListHistoryGiftAsync 
function* getListHistoryGiftAsync() {
    yield put({ type: type.APP.GET_LIST_HISTORY_GIFT_START })
    const resp = yield call(GiftModel.getListHistoryGift)
    yield put({ type: type.APP.GET_LIST_HISTORY_GIFT_END, payload: resp.data })
}


//getGiftByIdAsync
function* getGiftByIdAsync(action) {
    yield put({ type: type.APP.GET_GIFT_BY_ID_START })
    const resp = yield call(GiftModel.getGiftById, action.id)
    yield put({ type: type.APP.GET_GIFT_BY_ID_END, payload: resp.data })
}

//recievedGiftByIdAsync
function* recievedGiftByIdAsync(action) {
    yield put({ type: type.APP.RECIEVED_GIFT_BY_ID_START })
    let resp = yield call(GiftModel.recievedGiftById, action.id)
    if (resp.error == 0) {
        resp = yield call(GiftModel.getGiftById, action.id)
        yield put({ type: type.APP.GET_GIFT_BY_ID_END, payload: resp.data })
    }
    yield put({ type: type.APP.RECIEVED_GIFT_BY_ID_END })
}
