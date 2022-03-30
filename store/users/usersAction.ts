import { createAsyncThunk } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchUsers = createAsyncThunk(
  "users/get",
  async (userId, thunkAPI) => {
    const response = await fetch("http://192.168.1.135:5000/authors").then(
      (response) => response.json()
    );

    console.log(response);

    return response;
  }
);
