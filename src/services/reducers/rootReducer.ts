import { combineReducers } from "redux";
import { ingredientsReducer } from "./BurgerIngredients";
import { selectedIngredientReducer } from "./BurgerConstructor";
import { ingredientReducer } from "./IngredientDetails";
import { orderReducer } from "./OrderDetails";
import { authReducer, changePasswordReducer, recoveryReducer } from "./Auth";
import { registerReducer } from "./Register";
import { loginReducer, updateTokenReducer } from "./Login";
import { getUserReducer, logoutReducer, updateUserReducer } from "./Profile";
import { setOrderReducer } from "./Order";
import { orderDataReducer } from "./OrderData";
import { AppReducer } from "./App";
import { AppHeaderReducer } from "./AppHeader";
import { wsReducerAll } from "./wsReducerAll";
import { wsReducerAuth } from "./wsReducerAuth";

export const rootReducer = combineReducers({
  app: AppReducer,
  appHeader: AppHeaderReducer,
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  selectedIngredients: selectedIngredientReducer,
  order: orderReducer,
  recovery: recoveryReducer,
  changePassword: changePasswordReducer,
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  updateToken: updateTokenReducer,
  logout: logoutReducer,
  user: getUserReducer,
  updatedUser: updateUserReducer,
  setOrder: setOrderReducer,
  orderData: orderDataReducer,
  wsAll: wsReducerAll,
  wsAuth: wsReducerAuth,
});
