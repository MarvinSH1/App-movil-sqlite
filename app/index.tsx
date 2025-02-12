import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TasksScreen from "./src/screens/TasksScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TasksScreen} />
    </Stack.Navigator>
  );
}
