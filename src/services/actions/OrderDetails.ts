import { TItem } from "../../types";
import * as MainApi from "../../utils/MainApi";
import { AppDispatch, AppThunk } from "../types";
import { SET_INGREDIENTS_BUN, UPDATE_SELECTED_INGREDIENTS } from "./BurgerConstructor";
import { updateToken } from "./Login";

export const SEND_ORDER: "SEND_ORDER" = "SEND_ORDER";
export const SEND_ORDER_FAILED: "SEND_ORDER_FAILED" = "SEND_ORDER_FAILED";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";

export interface ISendOrderAction {
  readonly type: typeof SEND_ORDER;
}
export interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}
export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  payload: number;
}

export type TOrderDetailsActions =
  | ISendOrderAction
  | ISendOrderFailedAction
  | ISendOrderSuccessAction;

const rToken = localStorage.getItem("refreshToken");

function sendOrderFailed(): ISendOrderFailedAction {
  return {
    type: SEND_ORDER_FAILED,
  };
}

export const sendOrder: AppThunk = (id: string, accessToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_ORDER,
    });
    MainApi.postOrder(id, accessToken)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            payload: res.order.number,
          });
          dispatch({
            type: SET_INGREDIENTS_BUN,
            payload: { price: 0 } as TItem,
          });
          dispatch({
            type: UPDATE_SELECTED_INGREDIENTS,
            payload: [],
          });
        } else {
          dispatch(sendOrderFailed());
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          const target = "postOrder";
          dispatch(updateToken(rToken, target, id));
        } else {
          dispatch(sendOrderFailed());
        }
      });
  };
};
