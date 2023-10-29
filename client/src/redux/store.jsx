import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user:userReducer})
const persistConfig = {
  key:'root',
  storage,
  version:1

}

const persistedReducer = persistReducer( persistConfig, rootReducer);

//persistStore help you store the redux data/ app's state in localstoreage with config key.
//because when you refersh the page, the store is become empty.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({
        serializableCheck: false
      }),
      // Add any additional middleware here if needed
    ];
  }
});

export const persistor = persistStore(store);
