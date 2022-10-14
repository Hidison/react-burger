import { combineReducers } from "redux";
import { ingredientsReducer } from "./BurgerIngredients";
import { selectedIngredientReducer } from "./BurgerConstructor";
import { ingredientReducer } from "./IngredientDetails";
import { orderReducer } from "./OrderDetails";
import { authReducer, changePasswordReducer, recoveryReducer } from "./Auth";
import { registerReducer } from "./Register";
import { loginReducer, updateTokenReducer } from "./Login";
import { getUserReducer, logoutReducer, updateUserReducer } from "./Profile";

export const rootReducer = combineReducers({
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
});
