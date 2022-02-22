import { createSlice } from "@reduxjs/toolkit";

// interface RecipesState {
//   entities: any[];
//   loading: "idle" | "pending";
//   error: string | undefined | null;
// }
const initialState: RecipesState = {
  entities: [],
  loading: "idle",
  error: null,
};
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
});

export default recipesSlice.reducer;
