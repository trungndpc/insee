import { fork, all } from 'redux-saga/effects'

import customer from './customer'

export default function* rootSaga() {
  yield all([fork(customer)])
}
