//* Импортируем эффекты из saga
import { put, call, takeEvery, delay } from 'redux-saga/effects';
import axios from '../../axios/axios';
import { SET_CHAT } from '../types';

async function getChatFromServer(url, params) {
  console.log('PARAMS====>', params);
  const response = await axios.get(url, {
    params
  });
  if (response.data) {
    return response.data;
  } else {
    throw new Error();
  }
  
}

function* setChatWorker(data) {
  try {
    yield put({
      type: `${SET_CHAT}_START`,
    })

    const sitter = yield call(getChatFromServer, `/users/chat`, data.params);
    yield delay(300)
    yield put({
      type: `${SET_CHAT}_SUCCESS`,
      payload: sitter
    })

  } catch (err) {
    yield put({
      type: `${SET_CHAT}_ERROR`,
      err: err.message
    })
  }
}

//* watcher
export function* chatSaga() {
  yield takeEvery(SET_CHAT, setChatWorker);
}
