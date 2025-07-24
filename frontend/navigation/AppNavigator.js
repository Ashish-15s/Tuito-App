import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import { Ionicons } from '@expo/vector-icons'; // icon set

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#f0f0f0' },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#888',
          headerStyle: { backgroundColor: '#f0f0f0' },
          headerTintColor: '#333',
          contentStyle: { backgroundColor: '#ffffff' },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Add Student') {
              iconName = 'person-add-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Student" component={AddStudentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
