import {
  SET_INGREDIENTS_BUN,
  ADD_INGREDIENTS_MAIN,
  DEL_INGREDIENTS_MAIN,
  SET_TOTAL_PRICE,
  SET_INGREDIENTS_ID,
  UPDATE_SELECTED_INGREDIENTS,
} from "../actions/BurgerConstructor";
import { selectedIngredientReducer } from "./BurgerConstructor";

describe("Selected ingredient reducer", () => {
  const initialState = {
    selectedIngredientsBun: {
      calories: 420,
      carbohydrates: 53,
      count: 2,
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
    selectedIngredientsMain: [
      {
        calories: 986,
        carbohydrates: 609,
        dragId: "3416ca-074b-bd4e-7e4e-3fe7210a21c",
        fat: 689,
        image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
        image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
        name: "Хрустящие минеральные кольца",
        price: 300,
        proteins: 808,
        type: "main",
        __v: 0,
        _id: "60d3b41abdacab0026a733d0",
      },
      {
        calories: 4242,
        carbohydrates: 242,
        dragId: "276ba6-2e3a-af5e-f34b-34cbb3488e",
        fat: 142,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        name: "Биокотлета из марсианской Магнолии",
        price: 424,
        proteins: 420,
        type: "main",
        __v: 0,
        _id: "60d3b41abdacab0026a733cb",
      },
    ],
    totalPrice: 0,
    ID: [],
  };

  it("should return the initial state", () => {
    expect(selectedIngredientReducer(initialState, {})).toEqual(initialState);
  });

  it("should handle SET_INGREDIENTS_BUN", () => {
    expect(
      selectedIngredientReducer(initialState, {
        type: SET_INGREDIENTS_BUN,
        payload: {
          calories: 643,
          carbohydrates: 85,
          count: 2,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          __v: 0,
          _id: "60d3b41abdacab0026a733c7",
        },
      })
    ).toEqual({
      ...initialState,
      selectedIngredientsBun: {
        calories: 643,
        carbohydrates: 85,
        count: 2,
        fat: 26,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        name: "Флюоресцентная булка R2-D3",
        price: 988,
        proteins: 44,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c7",
      },
    });
  });

  it("should handle ADD_INGREDIENTS_MAIN", () => {
    expect(
      selectedIngredientReducer(initialState, {
        type: ADD_INGREDIENTS_MAIN,
        payload: {
          calories: 14,
          carbohydrates: 11,
          dragId: "be711d7-4f34-648b-eb4f-271364b1a2b4",
          fat: 22,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          name: "Соус фирменный Space Sauce",
          price: 80,
          proteins: 50,
          type: "sauce",
          __v: 0,
          _id: "60d3b41abdacab0026a733cd",
        },
      })
    ).toEqual({
      ...initialState,
      selectedIngredientsMain: [
        {
          calories: 986,
          carbohydrates: 609,
          dragId: "3416ca-074b-bd4e-7e4e-3fe7210a21c",
          fat: 689,
          image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
          image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
          name: "Хрустящие минеральные кольца",
          price: 300,
          proteins: 808,
          type: "main",
          __v: 0,
          _id: "60d3b41abdacab0026a733d0",
        },
        {
          calories: 4242,
          carbohydrates: 242,
          dragId: "276ba6-2e3a-af5e-f34b-34cbb3488e",
          fat: 142,
          image: "https://code.s3.yandex.net/react/code/meat-01.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          name: "Биокотлета из марсианской Магнолии",
          price: 424,
          proteins: 420,
          type: "main",
          __v: 0,
          _id: "60d3b41abdacab0026a733cb",
        },
        {
          calories: 14,
          carbohydrates: 11,
          dragId: "be711d7-4f34-648b-eb4f-271364b1a2b4",
          fat: 22,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          name: "Соус фирменный Space Sauce",
          price: 80,
          proteins: 50,
          type: "sauce",
          __v: 0,
          _id: "60d3b41abdacab0026a733cd",
        },
      ],
    });
  });

  it("should handle DEL_INGREDIENTS_MAIN", () => {
    expect(
      selectedIngredientReducer(initialState, {
        type: DEL_INGREDIENTS_MAIN,
        payload: [
          {
            calories: 99,
            carbohydrates: 42,
            dragId: "dd7d4c-717-1a18-850-38fc0748370",
            fat: 24,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            name: "Соус традиционный галактический",
            price: 15,
            proteins: 42,
            type: "sauce",
            __v: 0,
            _id: "60d3b41abdacab0026a733ce",
          },
          {
            calories: 2674,
            carbohydrates: 300,
            dragId: "8aeb075-1f54-6b7b-bb1-a5e2d866dcd3",
            fat: 800,
            image: "https://code.s3.yandex.net/react/code/meat-04.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            name: "Говяжий метеорит (отбивная)",
            price: 3000,
            proteins: 800,
            type: "main",
            __v: 0,
            _id: "60d3b41abdacab0026a733ca",
          },
        ],
      })
    ).toEqual({
      ...initialState,
      selectedIngredientsMain: [
        {
          calories: 99,
          carbohydrates: 42,
          dragId: "dd7d4c-717-1a18-850-38fc0748370",
          fat: 24,
          image: "https://code.s3.yandex.net/react/code/sauce-03.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
          name: "Соус традиционный галактический",
          price: 15,
          proteins: 42,
          type: "sauce",
          __v: 0,
          _id: "60d3b41abdacab0026a733ce",
        },
        {
          calories: 2674,
          carbohydrates: 300,
          dragId: "8aeb075-1f54-6b7b-bb1-a5e2d866dcd3",
          fat: 800,
          image: "https://code.s3.yandex.net/react/code/meat-04.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
          name: "Говяжий метеорит (отбивная)",
          price: 3000,
          proteins: 800,
          type: "main",
          __v: 0,
          _id: "60d3b41abdacab0026a733ca",
        },
      ],
    });
  });

  it("should handle SET_TOTAL_PRICE", () => {
    expect(
      selectedIngredientReducer(initialState, {
        type: SET_TOTAL_PRICE,
      })
    ).toEqual({
      ...initialState,
      totalPrice: 3234,
    });
  });

  it("should handle SET_INGREDIENTS_ID", () => {
    expect(
      selectedIngredientReducer(initialState, {
        type: SET_INGREDIENTS_ID,
      })
    ).toEqual({
      ...initialState,
      ID: ["60d3b41abdacab0026a733d0", "60d3b41abdacab0026a733cb", "60d3b41abdacab0026a733c6"],
    });
  });

  it("should handle UPDATE_SELECTED_INGREDIENTS", () => {
    expect(
      selectedIngredientReducer(initialState, {
        type: UPDATE_SELECTED_INGREDIENTS,
        payload: [
          {
            calories: 4242,
            carbohydrates: 242,
            dragId: "276ba6-2e3a-af5e-f34b-34cbb3488e",
            fat: 142,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            name: "Биокотлета из марсианской Магнолии",
            price: 424,
            proteins: 420,
            type: "main",
            __v: 0,
            _id: "60d3b41abdacab0026a733cb",
          },
          {
            calories: 986,
            carbohydrates: 609,
            dragId: "3416ca-074b-bd4e-7e4e-3fe7210a21c",
            fat: 689,
            image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
            image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            name: "Хрустящие минеральные кольца",
            price: 300,
            proteins: 808,
            type: "main",
            __v: 0,
            _id: "60d3b41abdacab0026a733d0",
          },
        ],
      })
    ).toEqual({
      ...initialState,
      selectedIngredientsMain: [
        {
          calories: 4242,
          carbohydrates: 242,
          dragId: "276ba6-2e3a-af5e-f34b-34cbb3488e",
          fat: 142,
          image: "https://code.s3.yandex.net/react/code/meat-01.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          name: "Биокотлета из марсианской Магнолии",
          price: 424,
          proteins: 420,
          type: "main",
          __v: 0,
          _id: "60d3b41abdacab0026a733cb",
        },
        {
          calories: 986,
          carbohydrates: 609,
          dragId: "3416ca-074b-bd4e-7e4e-3fe7210a21c",
          fat: 689,
          image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
          image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
          name: "Хрустящие минеральные кольца",
          price: 300,
          proteins: 808,
          type: "main",
          __v: 0,
          _id: "60d3b41abdacab0026a733d0",
        },
      ],
    });
  });
});
