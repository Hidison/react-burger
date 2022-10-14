import { TItem } from "../../types";
import {
  SEND_ORDER,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  TOrderDetailsActions,
} from "../actions/OrderDetails";

type TOrderListState = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderNumber: number;
  orderIngredient: TItem[];
};

const initialStateOrder: TOrderListState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: 1234,
  orderIngredient: [],
};

export const orderReducer = (
  state = initialStateOrder,
  action: TOrderDetailsActions
): TOrderListState => {
  switch (action.type) {
    case SEND_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderNumber: action.payload,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
