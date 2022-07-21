import { call, delay, put, debounce } from 'redux-saga/effects'
import axios from '../../axios/axios';
import { SEARCH, SEARCH_LIST } from '../types';

async function getDataFromServer(url, params) {
  const { data } = await axios.get(url, {params})


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
    
    const { 
      radioValue,
      latitude,
      longitude,
      dateFrom,
      dateTo,
      serviceType,
      distance,
      noPet,
      noChild,
      supervision_24,
      experience,
      housing_type,
      price_per_day,
      price_per_hour,
      sitter_pet_sizes,
      sitter_pet_ages } = data.params;
    const params = {
      radioValue, 
      latitude, 
      longitude, 
      dateFrom, 
      dateTo,
      serviceType, 
      distance,
      noPet,
      noChild,
      supervision_24,
      experience,
      housing_type,
      price_per_day,
      price_per_hour,
      sitter_pet_sizes,
      sitter_pet_ages
    }
    console.log(radioValue, 
      latitude, 
      longitude, 
      dateFrom, 
      dateTo,
      serviceType, 
      distance,
      noPet,
      noChild,
      supervision_24,
      experience,
      housing_type,
      price_per_day,
      price_per_hour,
      sitter_pet_sizes,
      sitter_pet_ages);
    yield delay(300)
    const result = yield call(getDataFromServer, '/search', params)
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
  yield debounce(300, SEARCH_LIST, searchWorker)
}

export default searchSaga
