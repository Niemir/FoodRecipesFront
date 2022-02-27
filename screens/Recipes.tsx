import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Day from "./Day";
import AddRecipe from "./Recipes/AddRecipe";
import List from "./Recipes/List";
import Edit from "./Recipes/Edit";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const LIST = "Lista przepisów";
export const ADD_NEW = "Dodaj przepis";
export const EDIT = "Edytuj przepis";

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
