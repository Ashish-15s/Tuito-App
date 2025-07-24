import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneLoginScreen from "../screens/PhoneLoginScreen";
import OTPVerifyScreen from "../screens/OTPVerifyScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
                <Stack.Screen name="OtpVerify" component={OTPVerifyScreen} />
                <Stack.Screen name="PasswordLogin" component={PasswordLoginScreen} options={{ title: 'Password Login' }} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
