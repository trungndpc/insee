import { takeLatest, call, put, take } from 'redux-saga/effects'
import * as type from '../actions/action-types'
import APIUtils from '../../utils/APIUtils'

export default function* promotion() {
    yield takeLatest(type.APP.GET_LIST_PROMOTION_ASYNC, getListPromotionAsync)
    yield takeLatest(type.APP.GET_PROMOTION_BY_ID_ASYNC, getPromotionAsync)
    yield takeLatest(type.APP.PUSH_CONTRUCTION_ASYNC, addOrUpdateContructionAsync)
    yield takeLatest(type.APP.GET_LIST_CONSTRUCTION_ASYNC, getListConstructionAsync)
    yield takeLatest(type.APP.GET_CONSTRUCTION_ASYNC, getConstructionAsync)
}

//Get list promotion 
function* getListPromotionAsync() {
    yield put({ type: type.APP.GET_LIST_PROMOTION_START })
    const resp = yield call(getListPromotion)
    yield put({ type: type.APP.GET_LIST_PROMOTION_END, payload: resp })
}

function getListPromotion() {
    return new Promise((resolve, reject) => {
        APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/promotion/list`, resolve, reject);
    });
}

// get promotion by id
function* getPromotionAsync(action) {
    yield put({ type: type.APP.GET_PROMOTION_BY_ID_START })
    const resp = yield call(getPromotion, action.id)
    yield put({ type: type.APP.GET_PROMOTION_BY_ID_END, payload: resp })
}

function getPromotion(id) {
    return new Promise((resolve, reject) => {
        APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/promotion?id=` + id, resolve, reject);
    });
}

//addOrUpdateContructionAsync
function* addOrUpdateContructionAsync(action) {
    yield put({ type: type.APP.PUSH_CONTRUCTION_START })
    const resp = yield call(postContruction, action.data)
    if (resp.error == 0) {
        yield put({ type: type.APP.PUSH_CONTRUCTION_END })
    } else {
        alert('Failed')
    }
}

function postContruction(data) {
    return new Promise((resolve, reject) => {
        APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/construction/create`, JSON.stringify(data), resolve, reject);
    });
}

//getListConstructionAsync
function* getListConstructionAsync() {
    yield put({ type: type.APP.GET_LIST_CONSTRUCTION_START })
    const resp = yield call(getListConstruction)
    yield put({ type: type.APP.GET_LIST_CONSTRUCTION_END, payload: resp.data })
}

function getListConstruction() {
    return new Promise((resolve, reject) => {
        APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/construction/me`, resolve, reject);
    });
}


//getConstructionAsync
function* getConstructionAsync(action) {
    yield put({ type: type.APP.GET_CONSTRUCTION_START })
    const resp = yield call(getConstruction, action.id)
    yield put({ type: type.APP.GET_CONSTRUCTION_END, payload: resp.data })
}

function getConstruction(id) {
    return new Promise((resolve, reject) => {
        APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/construction?id=${id}`, resolve, reject);
    });
}