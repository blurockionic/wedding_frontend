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
import { blogApiSlice } from "./blogSlice";
import { checklistApiSlice } from "./checklistApiSlice";
import { adminApiSlice } from "./adminApiSlice";
import { apiGuestSlice } from "./apiSlice.guest";
import { userDataTemplateSlice } from "./TemplateSlice";
import { weddingPlanForEventApi } from "./weddingPlanSlice";
import { invitationTemplateForAdminSlice } from "./invitationTemplateForAdminSlice";
import { partnerFormApi } from "./partnerFormSlice";
import { cloudinaryApi } from "./cloudinaryApiSlice";
import { partnerFormApi } from "./partnerFormSlice";



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
  [apiGuestSlice.reducerPath]:apiGuestSlice.reducer,
  [userDataTemplateSlice.reducerPath]:userDataTemplateSlice.reducer,
  [weddingPlanForEventApi.reducerPath  ]:weddingPlanForEventApi.reducer,
  [blogApiSlice.reducerPath ]:blogApiSlice.reducer,
  [partnerFormApi.reducerPath]: partnerFormApi.reducer,
  [invitationTemplateForAdminSlice.reducerPath]: invitationTemplateForAdminSlice.reducer,
  [cloudinaryApi.reducerPath]: cloudinaryApi.reducer
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
      adminApiSlice.middleware,
      partnerFormApi.middleware,
      userDataTemplateSlice.middleware,
      weddingPlanForEventApi.middleware,
      blogApiSlice.middleware,
      partnerFormApi.middleware,
      invitationTemplateForAdminSlice.middleware,
      cloudinaryApi.middleware
    ),
});

export const persistor = persistStore(store);