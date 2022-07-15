import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import sitterReducer from './reducers/sitter.reducer';
import searchReducer from './reducers/search.reducer';
import userReducer from './reducers/user.reducer'
import authReducer from './reducers/auth.reducer'

import rootSaga from './sagas/root.saga';

const sagaMidleWare = createSagaMiddleware();

 const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    auth: authReducer,
    sitter: sitterReducer,
  },
  middleware: (mid) => [...mid(), sagaMidleWare]
})

sagaMidleWare.run(rootSaga);
export default store;
