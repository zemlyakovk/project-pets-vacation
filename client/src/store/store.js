import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import sitterReducer from './reducers/sitter.reducer';
import userReducer from './reducers/user.reducer'
import rootSaga from './sagas/root.saga';

const sagaMidleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    sitter: sitterReducer
  },
  middleware: (mid) => [...mid(), sagaMidleWare]
})

sagaMidleWare.run(rootSaga);
