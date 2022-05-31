import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes } from "../../api/api";

// First, create the thunk
export const fetchRecipes = createAsyncThunk(
  "recipes/update",
  async (userId, thunkAPI) => {
    const user = await AsyncStorageLib.getItem("@user");

    let response;
    if (user) {
      const token = JSON.parse(user).token;
      response = await getRecipes(token);
    }
    return response;
  }
);
