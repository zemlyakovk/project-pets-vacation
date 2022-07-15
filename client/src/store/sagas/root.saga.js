import { all } from 'redux-saga/effects';
import { sitterSaga } from './sitter.saga';
import searchSaga from './search.saga';
import { userSaga } from './user.saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    sitterSaga(),
    searchSaga()
  ])
}
