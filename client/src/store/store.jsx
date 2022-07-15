import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import userReducer  from './reducers/user.reducer';
import authReducer from './reducers/auth.reducer';

import rootSaga from './sagas/root.saga';

const sagaMidleWare = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  middleware: (mid) => [...mid(), sagaMidleWare]
})

sagaMidleWare.run(rootSaga);

export default store;

// export const a = ''

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "./reducers/user.reducer";


// export const rootReducer = combineReducers({
//   user: userReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
// });



// export default store;
