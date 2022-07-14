import { all } from 'redux-saga/effects';
import searchSaga from './search.saga';
import { userSaga } from './user.saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    searchSaga()
  ])
}
