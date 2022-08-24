import {
  SEND_ORDER,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from "../actions/OrderDetails";

const initialStateOrder = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: 1234,
  orderIngredient: [],
};

export const orderReducer = (state = initialStateOrder, action) => {
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
        orderNumber: action.orderNumber,
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
