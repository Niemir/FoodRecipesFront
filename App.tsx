import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddRecipe from "./screens/Recipes/AddRecipe";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Days from "./screens/Days";
import ShoppingList from "./screens/ShoppingList";
import Recipes from "./screens/Recipes";

const RECIPES = "Przepisy";
const HOME = "Strona główna";
const DAYS = "Dni";
const SHOPPING_LIST = "Lista zakupów";
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

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
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
            <Tab.Screen name={HOME} component={Home} />
            <Tab.Screen
              name={RECIPES}
              component={Recipes}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name={DAYS}
              component={Days}
              options={{ headerShown: false }}
            />
            <Tab.Screen name={SHOPPING_LIST} component={ShoppingList} />
          </Tab.Navigator>
        </NavigationContainer>
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
