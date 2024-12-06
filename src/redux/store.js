import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine Reducers
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

// Configure Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [authSlice.name],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authSlice.middleware),
});


export const persistor = persistStore(store);
