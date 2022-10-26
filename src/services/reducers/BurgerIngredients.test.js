import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/BurgerIngredients";
import { ingredientsReducer } from "./BurgerIngredients";

describe("Ingredients reducer", () => {
  const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: [],
    bunIngredients: [],
    mainIngredients: [],
    sauceIngredients: [],
  };

  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS", () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        payload: [
          {
            calories: 420,
            carbohydrates: 53,
            fat: 24,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            name: "Краторная булка N-200i",
            price: 1255,
            proteins: 80,
            type: "bun",
            __v: 0,
            _id: "60d3b41abdacab0026a733c6",
          },
          {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            name: "Филе Люминесцентного тетраодонтимформа",
            price: 988,
            proteins: 44,
            type: "main",
            __v: 0,
            _id: "60d3b41abdacab0026a733c8",
          },
          {
            calories: 30,
            carbohydrates: 40,
            fat: 20,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            name: "Соус Spicy-X",
            price: 90,
            proteins: 30,
            type: "sauce",
            __v: 0,
            _id: "60d3b41abdacab0026a733cc",
          },
        ],
      })
    ).toEqual({
      ...initialState,
      ingredients: [
        {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          name: "Краторная булка N-200i",
          price: 1255,
          proteins: 80,
          type: "bun",
          __v: 0,
          _id: "60d3b41abdacab0026a733c6",
        },
        {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/meat-03.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
          name: "Филе Люминесцентного тетраодонтимформа",
          price: 988,
          proteins: 44,
          type: "main",
          __v: 0,
          _id: "60d3b41abdacab0026a733c8",
        },
        {
          calories: 30,
          carbohydrates: 40,
          fat: 20,
          image: "https://code.s3.yandex.net/react/code/sauce-02.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          name: "Соус Spicy-X",
          price: 90,
          proteins: 30,
          type: "sauce",
          __v: 0,
          _id: "60d3b41abdacab0026a733cc",
        },
      ],
      ingredientsRequest: false,
      bunIngredients: [
        {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          name: "Краторная булка N-200i",
          price: 1255,
          proteins: 80,
          type: "bun",
          __v: 0,
          _id: "60d3b41abdacab0026a733c6",
        },
      ],
      mainIngredients: [
        {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/meat-03.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
          name: "Филе Люминесцентного тетраодонтимформа",
          price: 988,
          proteins: 44,
          type: "main",
          __v: 0,
          _id: "60d3b41abdacab0026a733c8",
        },
      ],
      sauceIngredients: [
        {
          calories: 30,
          carbohydrates: 40,
          fat: 20,
          image: "https://code.s3.yandex.net/react/code/sauce-02.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          name: "Соус Spicy-X",
          price: 90,
          proteins: 30,
          type: "sauce",
          __v: 0,
          _id: "60d3b41abdacab0026a733cc",
        },
      ],
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false,
    });
  });
});
