import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddRecipe from "./screens/AddRecipe";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Days from "./screens/Days";
import ShoppingList from "./screens/ShoppingList";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Strona główna") {
                return <Ionicons name="home" size={size} color={color} />;
              } else if (route.name === "Dodaj przepis") {
                return <Ionicons name="add" size={size} color={color} />;
              } else if (route.name === "Dni") {
                return <Ionicons name="calendar" size={size} color={color} />;
              } else if (route.name === "Lista zakupów") {
                return <Ionicons name="cart" size={size} color={color} />;
              }
            },
            tabBarInactiveTintColor: "gray",
            tabBarActiveTintColor: "blue",
          })}
        >
          <Tab.Screen name="Strona główna" component={Home} />
          <Tab.Screen name="Dodaj przepis" component={AddRecipe} />
          <Tab.Screen
            name="Dni"
            component={Days}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Lista zakupów" component={ShoppingList} />
        </Tab.Navigator>
      </NavigationContainer>
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
