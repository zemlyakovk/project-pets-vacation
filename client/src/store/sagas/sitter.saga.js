//* Импортируем эффекты из saga
import { put, call, takeEvery } from 'redux-saga/effects';
import axios from '../../axios/axios';
import { SET_SITTER } from '../types';

async function getSitterFromServer(url) {
  const response = await axios.get(url);
  console.log(response);
  if (response.data) {
    return response.data;
  } else {
    throw new Error();
  }
  
}

function* setSitterWorker() {
  try {
    yield put({
      type: `${SET_SITTER}_START`,
    })

    const sitter = yield call(getSitterFromServer, `/sitters/profile`);

    yield put({
      type: `${SET_SITTER}_SUCCESS`,
      payload: sitter
    })

  } catch (err) {
    yield put({
      type: `${SET_SITTER}_ERROR`,
      err: err.message
    })
  }
}

//* watcher
export function* sitterSaga() {
  yield takeEvery(SET_SITTER, setSitterWorker);
}
