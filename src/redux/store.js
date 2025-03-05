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
<<<<<<< HEAD
import { apiGuestSlice } from "./apiSlice.guest";
import { TemplateSlice } from "./TemplateSlice";
=======
import {weddingPlanForEventApi} from "./weddingPlanSlice"
>>>>>>> 6bfe9d9ebf060021d0af372a543d96b668b8849c

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
<<<<<<< HEAD
  [apiGuestSlice.reducerPath]:apiGuestSlice.reducer,
  [TemplateSlice.reducerPath]:TemplateSlice.reducer,
=======
  [weddingPlanForEventApi.reducerPath]: weddingPlanForEventApi.reducer
>>>>>>> 6bfe9d9ebf060021d0af372a543d96b668b8849c
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
      weddingPlanForEventApi.middleware
    ),
});

export const persistor = persistStore(store);
