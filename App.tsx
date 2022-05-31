import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddRecipe from "./screens/Recipes/AddRecipe";
import { Provider, useSelector } from "react-redux";
import { store, useAppDispatch } from "./store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DaysNavigator from "./screens/DaysNavigator";
import ShoppingList from "./screens/ShoppingList";
import Recipes from "./screens/Recipes";
import SingleList from "./screens/SingleList";
import ShoppingNavigator from "./screens/ShoppingNavigator";
import SignIn from "./screens/SignIn";
import Register from "./screens/Register";
import { FC, useEffect } from "react";
import SplashScreen from "./screens/SplashScreen";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { checkUserOnInit } from "./store/auth/authReducer";
import {
  DAYS,
  HOME,
  RECIPES,
  REGISTER,
  SHOPPING_LIST,
  SIGNIN,
} from "./helpers/screens";
import Layout from "./components/Layout";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: "tomato",
    // accent: "yellow",
  },
};

const AppStack = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={SIGNIN}
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={REGISTER}
        component={Register}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const AppStackScreen = () => {
  return (
    <AppStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === HOME) {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === RECIPES) {
            return <Ionicons name="receipt" size={size} color={color} />;
          } else if (route.name === DAYS) {
            return <Ionicons name="calendar" size={size} color={color} />;
          } else if (route.name === SHOPPING_LIST) {
            return <Ionicons name="cart" size={size} color={color} />;
          }
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "blue",
      })}
    >
      <AppStack.Screen name={HOME} component={Home} />
      <AppStack.Screen
        name={RECIPES}
        component={Recipes}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={DAYS}
        component={DaysNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={SHOPPING_LIST}
        component={ShoppingNavigator}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};
const AppContent: FC = ({ children }) => {
  const { user, isLoading, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorageLib.getItem("@user");
      dispatch(checkUserOnInit(user ? JSON.parse(user) : null));
    };
    getUser();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {user ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppContent />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
