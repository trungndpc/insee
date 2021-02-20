import { fork, all } from 'redux-saga/effects'

import app from './app'
import promotion from './promotion'
import gift from './gift'

export default function* rootSaga() {
  yield all([fork(app)])
  yield all([fork(promotion)])
  yield all([fork(gift)])
}
