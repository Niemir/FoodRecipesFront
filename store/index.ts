import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import recipesSlice from "./recipes/recipesReducer";
import usersSlice from "./users/usersReducer";
import messageSlice from "./messages/messagesReducer";
import authSlice from "./auth/authReducer";
export const store = configureStore({
  reducer: {
    recipes: recipesSlice,
    users: usersSlice,
    messages: messageSlice,
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
