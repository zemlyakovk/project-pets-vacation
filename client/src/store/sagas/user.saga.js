//* Импортируем эффекты из saga
import { put, call, debounce, takeEvery } from 'redux-saga/effects';
import { LOGIN_USER, LOGOUT_USER, SET_USER, REG_USER } from '../types';

async function authUserOnServer(url, data) {
  console.log(data.params);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.params)
  })
  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    throw new Error(result.message);
  }
}

async function logoutUserOnServer(url) {
  const response = await fetch(url, {
    credentials: 'include',
  })
  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    throw new Error(result.message);
  }
}

//* worker
function* regWorker(data) {
  try {
    yield put({
      type: `${SET_USER}_START`,
    })

    const user = yield call(authUserOnServer, `${process.env.REACT_APP_API_URL}/user/reg`, data);

    yield put({
      type: `${SET_USER}_SUCCESS`,
      payload: user
    })

  } catch (err) {
    yield put({
      type: `${SET_USER}_ERROR`,
      err: err.message
    })
  }
}

function* loginWorker(data) {
  try {
    yield put({
      type: `${SET_USER}_START`,
    })

    const user = yield call(authUserOnServer, `${process.env.REACT_APP_API_URL}/user/login`, data);

    yield put({
      type: `${SET_USER}_SUCCESS`,
      payload: user
    })

  } catch (err) {
    yield put({
      type: `${SET_USER}_ERROR`,
      err: err.message
    })
  }
}

function* logoutWorker() {
  try {
    yield put({
      type: `${SET_USER}_START`
    })

    yield call(logoutUserOnServer, `${process.env.REACT_APP_API_URL}/user/logout`);

    yield put({
      type: `${SET_USER}_SUCCESS`,
      payload: {}
    })

  } catch (err) {
    yield put({
      type: `${SET_USER}_ERROR`,
      err: err.message
    })
  }
}

//* watcher
export function* userSaga() {
  yield debounce(100, REG_USER, regWorker);
  yield debounce(100, LOGIN_USER, loginWorker);
  yield takeEvery(LOGOUT_USER, logoutWorker)
}
