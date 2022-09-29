import * as MainApi from "../../utils/MainApi";

export const SEND_ORDER = "SEND_ORDER";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";

function sendOrderFailed() {
  return {
    type: SEND_ORDER_FAILED,
  };
}

export function sendOrder(id: string) {
  return function (dispatch: any) {
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
          dispatch(sendOrderFailed());
        }
      })
      .catch((err) => {
        dispatch(sendOrderFailed());
      });
  };
}
