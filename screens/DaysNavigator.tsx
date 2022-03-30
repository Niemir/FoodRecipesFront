import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Day from "./Day";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DaysNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name="calendar-outline" size={size} color={color} />;
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "blue",
        tabBarItemStyle: { marginBottom: 4 },
      })}
    >
      <Tab.Screen name="Dzień 1" component={Day} initialParams={{ dayID: 1 }} />
      <Tab.Screen name="Dzień 2" component={Day} initialParams={{ dayID: 2 }} />
      <Tab.Screen name="Dzień 3" component={Day} initialParams={{ dayID: 3 }} />
      <Tab.Screen name="Dzień 4" component={Day} initialParams={{ dayID: 4 }} />
    </Tab.Navigator>
  );
};

export default DaysNavigator;
