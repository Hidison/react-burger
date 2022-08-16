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

export const postOrder = (id) => {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: id,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
};
