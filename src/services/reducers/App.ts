import { SET_APP_HEIGHT, TAppActions } from "../actions/App";

type TAppListState = {
  heightApp: number;
};

const initialStateApp: TAppListState = {
  heightApp: 0,
};

export const AppReducer = (state = initialStateApp, action: TAppActions): TAppListState => {
  switch (action.type) {
    case SET_APP_HEIGHT: {
      return {
        ...state,
        heightApp: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
