import { all } from 'redux-saga/effects';
import { sitterSaga } from './sitter.saga';
import { userSaga } from './user.saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    sitterSaga()
  ])
}
