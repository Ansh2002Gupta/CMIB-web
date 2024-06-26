import React from "react";
import ReactDOM from "react-dom";
import "./themes";
import "./interceptor";
import App from "./App";
// import 'react_reusable_components/dist/reusable-components.css';
import GlobalProvider from "./globalContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
