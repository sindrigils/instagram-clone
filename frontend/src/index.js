import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import AuthProvider from "./providers/AuthProvider";
import "./index.css";
import store from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <React.StrictMode>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </React.StrictMode>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
