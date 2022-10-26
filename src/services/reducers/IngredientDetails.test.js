import { SET_INGREDIENT } from "../actions/IngredientDetails";
import { ingredientReducer } from "./IngredientDetails";

describe("Ingredient reducer", () => {
  const initialState = {
    ingredient: null,
  };

  it("should return the initial state", () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_INGREDIENT", () => {
    expect(
      ingredientReducer(initialState, {
        type: SET_INGREDIENT,
        payload: {
          calories: 77,
          carbohydrates: 55,
          fat: 5,
          image: "https://code.s3.yandex.net/react/code/sp_1.png",
          image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
          name: "Плоды Фалленианского дерева",
          price: 874,
          proteins: 20,
          type: "main",
          __v: 0,
          _id: "60d3b41abdacab0026a733d1",
        },
      })
    ).toEqual({
      ...initialState,
      ingredient: {
        calories: 77,
        carbohydrates: 55,
        fat: 5,
        image: "https://code.s3.yandex.net/react/code/sp_1.png",
        image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
        name: "Плоды Фалленианского дерева",
        price: 874,
        proteins: 20,
        type: "main",
        __v: 0,
        _id: "60d3b41abdacab0026a733d1",
      },
    });
  });
});
