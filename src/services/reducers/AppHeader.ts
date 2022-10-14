import { SET_APP_HEADER_HEIGHT, TAppHeaderActions } from "../actions/AppHeader";

type TAppHeaderListState = {
  heightHeader: number;
};

const initialStateAppHeader: TAppHeaderListState = {
  heightHeader: 0,
};

export const AppHeaderReducer = (
  state = initialStateAppHeader,
  action: TAppHeaderActions
): TAppHeaderListState => {
  switch (action.type) {
    case SET_APP_HEADER_HEIGHT: {
      return {
        ...state,
        heightHeader: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
