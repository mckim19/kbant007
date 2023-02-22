import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./screens/Index";
import SignIn from "./screens/SignIn";
import CountNoti from "./screens/CountNoti"

const Stack = createNativeStackNavigator();
const queryCient = new QueryClient();


export function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryCient}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={'Index'} component={Index}/>
                    <Stack.Screen name={'SignIn'} component={SignIn}/>
                    <Stack.Screen name={'CountNoti'} component={CountNoti}/>
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

