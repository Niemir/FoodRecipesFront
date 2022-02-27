import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRecipes } from "./recipesAction";

interface RecipesState {
  entities: any[];
  loading: "idle" | "pending";
  error: string | undefined | null;
  shoppingList: { [key: number]: any[] };
}
const initialState: RecipesState = {
  entities: [],
  loading: "idle",
  error: null,
  shoppingList: {
    1: [],
    2: [],
    3: [],
    4: [],
  },
};
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    addToDay(state, action: PayloadAction) {
      // state.shoppingList
      // console.log(action);
      state.shoppingList[action.payload.day].push(action.payload.activeRecipes);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchRecipes.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          //   state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.entities = action.payload.recipes;
          // state.currentRequestId = undefined
        }
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === "pending") {
          state.loading = "idle";
          state.error = action.error;
        }
      });
  },
});

export const { addToDay } = recipesSlice.actions;
export default recipesSlice.reducer;
