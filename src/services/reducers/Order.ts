import { SET_ORDER, TOrderActions } from "../actions/Order";

type TOrderListState = {
  order: any;
};

const initialStateOrder: TOrderListState = {
  order: {},
};

export const setOrderReducer = (
  state = initialStateOrder,
  action: TOrderActions
): TOrderListState => {
  switch (action.type) {
    case SET_ORDER: {
      return {
        ...state,
        order: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
