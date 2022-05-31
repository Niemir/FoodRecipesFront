import axios from "axios";
import { logIn, signUp } from "../api/api";
const API_URL = "http://localhost:8080/api/auth/";
import AsyncStorage from "@react-native-async-storage/async-storage";

const register = (name: string, email: string, password: string) => {
  return signUp(name, email, password);
};

const login = async (email: string, password: string) => {
  return logIn(email, password).then(async (response) => {
    try {
      console.log("data z login", response.data);
      if (response.data.token) {
        console.log("token set to: ", response.data.token);
        await AsyncStorage.setItem("@user", JSON.stringify(response.data));
      }
    } catch (e) {
      console.log(e);
    }

    return response.data;
  });
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem("@user");
  } catch (err) {
    console.log("logout error", err);
  }
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
