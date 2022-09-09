import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import IngredientsPageStyles from "./ingredient.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { getIngredients } from "../services/actions/BurgerIngredients";
import { useHistory } from "react-router-dom";
import NotFound404 from "./not-found";
import { SET_INGREDIENT } from "../services/actions/IngredientDetails";
import { getIngIdFromLocation } from "../utils/utils";

const IngredientPage = () => {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredients } = useSelector(
    (state) => state.ingredients
  );
  const history = useHistory();

  const ingredientIdFromlocation = getIngIdFromLocation(
    history.location.pathname
  );

  const ingredient = useMemo(
    () => ingredients.find((item) => item._id === ingredientIdFromlocation),
    [ingredientIdFromlocation, ingredients]
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: SET_INGREDIENT,
      item: ingredient,
    });
  }, [dispatch, ingredient]);

  if (ingredientsRequest) {
    return null;
  } else if (!ingredient) {
    return <NotFound404 />;
  } else {
    return (
      <>
        <AppHeader />
        <div className={IngredientsPageStyles.ingredientContainer}>
          <h2
            className={`${IngredientsPageStyles.title} text text_type_main-large mt-30`}
          >
            Детали ингредиента
          </h2>
          <IngredientDetails />
        </div>
      </>
    );
  }
};

export default IngredientPage;
