import { call, delay, put, takeEvery } from 'redux-saga/effects'
import axios from '../../axios/axios';
import { SET_FAVORIT, ADD_FAVORIT } from '../types/favorit.type';

async function getDataFromServer(url, params) {
  const { data } = await axios.post(url, {params})
  if (data) {
    return data
  } else {
    throw new Error('Noooooooooo(((((((')
  }
}

async function getListFavoritFromServer(url) {
  const { data } = await axios.get(url)
  if (data) {
    return data
  } else {
    throw new Error('Noooooooooo(((((((')
  }
}

function* favoritWorker(data) {
  try {
    yield put ({
      type: `${ADD_FAVORIT}_START`
    })
    console.log(data.params);

    yield delay(300)
    const result = yield call(getDataFromServer, '/favorit/add', data.params)
    console.log(result);
    // yield put ({
    //   type: `${SEARCH}_SUCCESS`,
    //   payload: result
    // })

  } catch (err) {
    yield put({
      type: `${ADD_FAVORIT}_ERR`,
      error: err.message
    })
  }
}

function* getFavoritListWorker() {
  try {
    yield put ({
      type: `${SET_FAVORIT}_START`
    })

    yield delay(300)
    const result = yield call(getListFavoritFromServer, '/favorit')
    console.log(result);
    yield put ({
      type: `${SET_FAVORIT}_SUCCESS`,
      payload: result
    })
    

  } catch (err) {
    yield put({
      type: `${SET_FAVORIT}_ERR`,
      error: err.message
    })
  }
}

function* favoritSaga() {
  yield takeEvery('FAVORIT', favoritWorker)
  yield takeEvery('FAVORIT_LIST', getFavoritListWorker)
}

export default favoritSaga
