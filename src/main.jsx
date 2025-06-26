import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { motionlogo } from "./static/static.js";


createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate
      loading={
        <div className="flex justify-center flex-col gap-2 items-center h-screen">
          <img src={motionlogo} alt="loader" className="w-12 h-12" />
          <p>Loading...</p>
        </div>
      }
      persistor={persistor}
    >
      <App />
     
    </PersistGate>
  </Provider>
  // </StrictMode>
);
