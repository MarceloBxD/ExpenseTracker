import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ManageExpenses } from "./screens/ManageExpenses";

import { Ionicons } from "@expo/vector-icons";
import { AllExpenses } from "./screens/AllExpenses";
import { RecentExpenses } from "./screens/RecentExpenses";
import { GlobalStyles } from "./styles/GlobalStyles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: GlobalStyles.colors.white,
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
      }}
    >
      <Tab.Screen
        options={{
          title: "Totais",
          tabBarLabel: "Todas as Despesas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={24} color={color} />
          ),
        }}
        name="AllExpenses"
        component={AllExpenses}
      />
      <Tab.Screen
        name="RecentExpenses"
        options={{
          title: "Despesas Recentes",
          tabBarLabel: "Recentes",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time-outline" size={24} color={color} />
          ),
        }}
        component={RecentExpenses}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ExpensesOverview"
            component={ExpensesOverview}
          />
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
