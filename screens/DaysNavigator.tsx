import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Day from "./Day";
import { Button, useTheme } from "react-native-paper";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DaysNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <Ionicons name="calendar-outline" size={size} color={color} />;
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: theme.colors.primary,
        tabBarItemStyle: { marginBottom: 4 },
      })}
      initialRouteName="Dzień 1">
      <Tab.Screen name="Dzień 1" component={Day} initialParams={{ dayID: 1 }} />
      <Tab.Screen name="Dzień 2" component={Day} initialParams={{ dayID: 2 }} />
      <Tab.Screen name="Dzień 3" component={Day} initialParams={{ dayID: 3 }} />
      <Tab.Screen name="Dzień 4" component={Day} initialParams={{ dayID: 4 }} />
    </Tab.Navigator>
  );
};

export default DaysNavigator;
