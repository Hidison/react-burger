import * as MainApi from "../../utils/MainApi.js";

export const SEND_ORDER = "SEND_ORDER";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";

export function sendOrder(id) {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER,
    });
    MainApi.postOrder(id)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            orderNumber: res.order.number,
          });
        } else {
          dispatch({
            type: SEND_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: SEND_ORDER_FAILED,
        });
      });
  };
}
