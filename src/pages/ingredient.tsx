import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import IngredientsPageStyles from "./ingredient.module.css";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { useHistory } from "react-router-dom";
import NotFound404 from "./not-found";
import { SET_INGREDIENT } from "../services/actions/IngredientDetails";
import { getIngIdFromLocation } from "../utils/utils";
import { TItem } from "../types";

const IngredientPage = () => {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredients } = useSelector((state) => state.ingredients);
  const history = useHistory();

  const ingredientIdFromlocation: string = getIngIdFromLocation(history.location.pathname);

  const ingredient = useMemo(
    () => ingredients.find((item: TItem) => item._id === ingredientIdFromlocation),
    [ingredientIdFromlocation, ingredients]
  );

  useEffect(() => {
    dispatch({
      type: SET_INGREDIENT,
      payload: ingredient as TItem,
    });
  }, [dispatch, ingredient]);

  if (ingredientsRequest) {
    return null;
  } else if (!ingredient) {
    return <NotFound404 />;
  } else {
    return (
      <div className={IngredientsPageStyles.ingredientContainer}>
        <h2 className={`${IngredientsPageStyles.title} text text_type_main-large mt-30`}>
          Детали ингредиента
        </h2>
        <IngredientDetails />
      </div>
    );
  }
};

export default IngredientPage;
