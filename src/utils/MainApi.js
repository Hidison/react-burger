export const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";

export const getIngredients = () => {
  return fetch(`${BASE_URL}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
};
