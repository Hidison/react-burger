import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import App from "./components/App/App";
import { rootReducer } from "./services/reducers/rootReducer";

const composeEnhancers =
  typeof window === "object" &&
  (window as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
