import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SHOPPING_LIST, SINGLE_LIST } from "../App";
import SingleList from "./SingleList";
import ShoppingList from "./ShoppingList";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ShoppingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SHOPPING_LIST}
        component={ShoppingList}
        initialParams={{ dayID: 1 }}
      />
      <Stack.Screen
        name={SINGLE_LIST}
        component={SingleList}
        initialParams={{ dayID: 2 }}
      />
    </Stack.Navigator>
  );
};

export default ShoppingNavigator;
