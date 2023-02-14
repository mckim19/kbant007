import * as React from "react";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createNativeStackNavigator();
const queryCient = new QueryClient();

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryCient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'homeScreen'} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

