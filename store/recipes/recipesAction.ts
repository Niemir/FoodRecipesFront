import { createAsyncThunk } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchRecipes = createAsyncThunk(
  "recipes/update",
  async (userId, thunkAPI) => {
    // console.log(userId, thunkAPI);
    const response = await fetch("http://192.168.1.135:5000/getRecipes").then(
      (response) => response.json()
    );

    return response;
  }
);
