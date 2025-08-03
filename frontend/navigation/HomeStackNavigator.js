import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import EditStudentScreen from '../screens/EditStudentScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="EditStudentScreen" component={EditStudentScreen} options={{ title: 'Edit Student' }} />
        </Stack.Navigator>
    );
}
