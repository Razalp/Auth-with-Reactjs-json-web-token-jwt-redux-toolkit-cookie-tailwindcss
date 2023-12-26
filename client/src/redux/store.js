import { combineReducers, configureStore } from '@reduxjs/toolkit';
import useReducer from './userSlice';  
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: useReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,  
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);  // Corrected the function name

export const store = configureStore({
  reducer:  persistedReducer ,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
