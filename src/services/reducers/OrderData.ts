import { TMessageOrder } from "../../types";
import { SET_ORDER_DATA, TOrderDataActions } from "../actions/OrderData";

type TOrderDataListState = {
  orderData: TMessageOrder | null;
};

const initialStateOrderData: TOrderDataListState = {
  orderData: null,
};

export const orderDataReducer = (
  state = initialStateOrderData,
  action: TOrderDataActions
): TOrderDataListState => {
  switch (action.type) {
    case SET_ORDER_DATA: {
      return {
        ...state,
        orderData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
