import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@env";

// First, create the thunk
export const fetchUsers = createAsyncThunk(
  "users/get",
  async (userId, thunkAPI) => {
    const response = await fetch(`${API_URL}authors`).then((response) =>
      response.json()
    );

    return response;
  }
);
