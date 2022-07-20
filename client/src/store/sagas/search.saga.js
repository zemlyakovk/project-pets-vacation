import { call, put, takeEvery } from 'redux-saga/effects'
import axios from '../../axios/axios';
import { SEARCH, SEARCH_LIST } from '../types';

async function getDataFromServer(url, text) {
  const { data } = await axios.get(url, text)

  if (data) {
    return data
  } else {
    throw new Error('Noooooooooo(((((((')
  }
}

function* searchWorker(data) {
  try {
    yield put ({
      type: `${SEARCH}_START`
    })
    
    const { radioValue, latitude, longitude, dateFrom, dateTo, serviceType, distance } = data.params;
    const url = `/search?latitude=${latitude}&longitude=${longitude}&distance=${distance}&radioValue=${radioValue}&dateFrom=${dateFrom}&dateTo=${dateTo}&serviceType=${serviceType}`
    const result = yield call(getDataFromServer, url)
    console.log(result);
    yield put ({
      type: `${SEARCH}_SUCCESS`,
      payload: result
    })

  } catch (err) {
    yield put({
      type: `${SEARCH}_ERR`,
      error: err.message
    })
  }
}

function* searchSaga() {
  yield takeEvery(SEARCH_LIST, searchWorker)
}

export default searchSaga
