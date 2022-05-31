import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Day from "./Day";
import AddRecipe from "./Recipes/AddRecipe";
import List from "./Recipes/List";
import Edit from "./Recipes/Edit";
import { NavigationContainer } from "@react-navigation/native";
import { ADD_NEW, EDIT, LIST } from "../helpers/screens";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Recipes = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen name={LIST} component={List} />
        <Stack.Screen name={ADD_NEW} component={AddRecipe} />
        <Stack.Screen name={EDIT} component={Edit} />
      </Stack.Navigator>
    </View>
  );
};

export default Recipes;
