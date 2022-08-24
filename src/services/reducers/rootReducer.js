import { combineReducers } from "redux";
import { ingredientsReducer } from "./BurgerIngredients";
import { selectedIngredientReducer } from "./BurgerConstructor";
import { ingredientReducer } from "./IngredientDetails";
import { orderReducer } from "./OrderDetails";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  selectedIngredients: selectedIngredientReducer,
  order: orderReducer,
});
