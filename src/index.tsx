import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./reducers";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie"


const root = createRoot(document.getElementById("root"));

root.render(
  <CookiesProvider>
    <Suspense
      fallback={
        <div id="sus-fallback">
          <h1>در حال بارگذاری</h1>
        </div>
      }
>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </CookiesProvider>
);
