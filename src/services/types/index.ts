import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TAuthActions } from "../actions/Auth";
import { TBurgerConstructorActions } from "../actions/BurgerConstructor";
import { TBurgerIngredientsActions } from "../actions/BurgerIngredients";
import { TIngredientDetailsActions } from "../actions/IngredientDetails";
import { TLoginActions } from "../actions/Login";
import { TOrderDetailsActions } from "../actions/OrderDetails";
import { TProfileActions } from "../actions/Profile";
import { TRegisterActions } from "../actions/Register";
import { TWSActions } from "../actions/wsActionTypes";
import { store } from "../store";
import { TOrderActions } from "../actions/Order";
import { TOrderDataActions } from "../actions/OrderData";
import { TAppActions } from "../actions/App";
import { TAppHeaderActions } from "../actions/AppHeader";

export type TApplicationActions =
  | TAppActions
  | TAppHeaderActions
  | TAuthActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TIngredientDetailsActions
  | TLoginActions
  | TOrderActions
  | TOrderDataActions
  | TOrderDetailsActions
  | TProfileActions
  | TRegisterActions
  | TWSActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
