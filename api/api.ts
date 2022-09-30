import axios from "axios";
import { API_URL } from "@env";

const api = axios.create({
  baseURL: API_URL || `http://192.168.1.108:5000/`,
  timeout: 3000,
  timeoutErrorMessage: "timeout",
});

export default axios.create({
  baseURL: API_URL || `http://192.168.1.108:5000/`,
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

export const getShoppingLists = async (token: string) => {
  return api.get(`shoppingList/?token=${token}`);
};
export const mergeShoppingLists = async (
  recipe1: string,
  recipe2: string,
  token: string
) => {
  return api.post(`shoppingList/merge/`, {
    token,
    recipe1,
    recipe2,
  });
};

export const getSingleRecipe = async (id: string, token: string) => {
  if (!token) {
    throw new Error("No token provided");
  }
  let data;
  try {
    data = await api
      .get(`recipes/single/${id}?token=${token}`)
      .then((response) => response.data);
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const editSingleRecipe = async (recipeData: any, token: string) => {
  if (!token) {
    throw new Error("No token provided");
  }
  let data;
  try {
    data = await api
      .put(`recipes/edit`, { ...recipeData, token })
      .then((response) => response.data)
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getRecipes = async (token: string) => {
  if (!token) {
    throw new Error("No token provided");
  }
  let data;
  try {
    data = await api
      .get(`recipes?token=${token}`)
      .then((response) => response.data);
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getIngredients = async (q: string) => {
  return api.get(`ingredients/search/?q=${q}`);
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

export const logIn = (email: string, password: string) => {
  return api.post("auth/login", {
    email: email,
    password: password,
  });
};

export const signUp = (name: string, email: string, password: string) => {
  return api.post("auth/register", {
    name,
    email,
    password,
  });
};

export const addConnection = async (friendID: string, token: string) => {
  return api.post("connections", {
    friendID: friendID,
    token: token,
  });
};

export const removeConnection = async (friendID: string, token: string) => {
  return api.delete("connections", {
    data: {
      friendID,
      token,
    },
  });
};
