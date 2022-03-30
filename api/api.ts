import axios from "axios";

const api = axios.create({
  baseURL: `http://192.168.1.135:5000/`,
});

export default axios.create({
  baseURL: `http://192.168.1.135:5000/`,
});

export const deleteRecipe = (id: string) => {
  return api.delete("shoppinglist/delete", {
    data: {
      id: id,
    },
  });
};

export const getShoppingList = (id: string) => {
  return api.get(`shoppingList/single/?id=${id}`);
};

export const updateIngredientValue = (
  listId: string,
  ingredientName: string,
  value: boolean
) => {
  return api.put(`shoppingList/updateIngredients`, {
    id: listId,
    ingredientName: ingredientName,
    value: value,
  });
};
