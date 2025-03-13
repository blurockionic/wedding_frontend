import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import checklistSlice from "./checklistSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiAuthSlice } from "./apiSlice.auth";
import { serviceApi } from "./serviceSlice";
import favoritesSlice from "./favoriteSlice";
import { uploadSlice } from "./uploadSlice";
import { vendorApi } from "./vendorSlice";
import { paymentApi } from "./payment";
import { checklistApiSlice } from "./checklistApiSlice"; 
import { adminApiSlice } from "./adminApiSlice";

// Combine Reducers
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [checklistSlice.name]: checklistSlice.reducer,
  [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer,
  [uploadSlice.reducerPath]: uploadSlice.reducer,
  [vendorApi.reducerPath]: vendorApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [checklistApiSlice.reducerPath]: checklistApiSlice.reducer,
  [adminApiSlice.reducerPath]: adminApiSlice.reducer,
});

// Configure Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [authSlice.name, favoritesSlice.name],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      apiAuthSlice.middleware,
      serviceApi.middleware,
      uploadSlice.middleware,
      vendorApi.middleware,
      paymentApi.middleware,
      checklistApiSlice.middleware,
      adminApiSlice.middleware
    ),
});

export const persistor = persistStore(store);
