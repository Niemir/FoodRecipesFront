import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SingleList from "./SingleList";
import ShoppingList from "./ShoppingList";
import { SHOPPING_LIST, SINGLE_LIST } from "../helpers/screens";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ShoppingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SHOPPING_LIST} component={ShoppingList} />
      <Stack.Screen name={SINGLE_LIST} component={SingleList} />
    </Stack.Navigator>
  );
};

export default ShoppingNavigator;
