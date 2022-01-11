import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  recipes: string[];
}

const initialState: CounterState = {
  value: 0,
  recipes: [],
};

export const recipesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<string>) => {
      state.recipes.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
