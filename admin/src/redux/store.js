import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './productRedux';
import userReducer from './userRedux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};
const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// import {configureStore} from "@reduxjs/toolkit"
// import userReducer from "./userReducer"

// const store =configureStore ({
//     reducer:{
//         user:userReducer
//     }

// })
// export default store;
