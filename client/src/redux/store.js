import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux"
import userReducer from "./userRedux"

export  const store= configureStore({
  reducer:{
    cart:cartReducer,
    user:userReducer
  }
})














// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartRedux';
// import userReducer from "./userRedux"

// import { persistStore, persistReducer, FLUSH, REHYDRATE,PERSIST, PAUSE, PURGE, REGISTER } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'root',
//   version:1,
//   storage,
// }
// const rootReducer =combineReducers({user:userReducer,cart:cartReducer})
// const persistedReducer = persistReducer(persistConfig, rootReducer)
// export const store=()=> configureStore({
//   reducer: persistedReducer,
//   middleware:(getDefaultMiddleware)=> 
//   getDefaultMiddleware({
//     serializableCheck:{
//       ignoreActions:[FLUSH,REHYDRATE,PERSIST  ,PAUSE,PURGE,REGISTER]
//     }
//   })
// });
// export let persistor=persistStore(store)  