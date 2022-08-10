export const baseUrl = "https://norma.nomoreparties.space/api";

export const getIngredients = () => {
  return fetch(`${baseUrl}/ingredients`, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
};
