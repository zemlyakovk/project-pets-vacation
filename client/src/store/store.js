import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import searchReducer from './reducers/search.reducer';
import userReducer from './reducers/user.reducer'
import rootSaga from './sagas/root.saga';

const sagaMidleWare = createSagaMiddleware();

 const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
  middleware: (mid) => [...mid(), sagaMidleWare]
})

sagaMidleWare.run(rootSaga);
export default store;
