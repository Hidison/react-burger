import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { compose } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { socketMiddleware } from "./middleware";
import { WSActionsAll } from "./actions/wsActionTypesAll";
import { WSActionsAuth } from "./actions/wsActionTypesAuth";

const urlAll = "wss://norma.nomoreparties.space/orders/all";
const urlAuth = "wss://norma.nomoreparties.space/orders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && (window as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(urlAuth, WSActionsAuth, true),
    socketMiddleware(urlAll, WSActionsAll, false)
  )
);

export const store = createStore(rootReducer, enhancer);
