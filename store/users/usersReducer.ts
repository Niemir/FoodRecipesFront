import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../components/AddRecipes/Authors";
import { fetchUsers } from "./usersAction";

interface UsersState {
  users: User[];
  loading: "idle" | "pending";
  error: string | undefined | null;
}
const initialState: UsersState = {
  users: [],
  loading: "idle",
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          //   state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.users = action.payload.authors;
          // state.currentRequestId = undefined
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === "pending") {
          state.loading = "idle";
          state.error = action.error;
        }
      });
  },
});

// export const { addToDay } = usersSlice.actions;
export default usersSlice.reducer;
