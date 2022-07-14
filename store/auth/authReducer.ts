import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messagesReducer";
import AuthService from "../../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
const user = async () => {
  try {
    const value = await AsyncStorage.getItem("@user");
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(
        setMessage(
          //response.data.message
          "utworzono konto"
        )
      );
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage("bład przy tworzeniu konta"));
      return thunkAPI.rejectWithValue("error");
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage("bład przy logowaniu"));
      return thunkAPI.rejectWithValue("error login");
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = { isLoggedIn: false, user: null, isLoading: true };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkUserOnInit: (state, action) => {
      state.isLoading = false;
      if (action.payload?.token) {
        const token = action.payload?.token;
        const decodedToken: { exp: number; email: string; user_id: string } =
          jwt_decode(token);

        const tokenIsExpired = decodedToken.exp < Date.now() / 1000;
        if (tokenIsExpired) {
          state.isLoggedIn = false;
        } else {
          state.user = action.payload;
          state.isLoggedIn = true;
        }
      }
    },
    updateUser: (state, action) => {
      // state.user = action.payload;
      if (action.payload.connections) {
        state.user.connections = action.payload.connections;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});
export const { checkUserOnInit, updateUser } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
