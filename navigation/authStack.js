import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/Signin/Signin';
import SignUpScreen from '../screens/Signup/Signup';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Signup' component={SignUpScreen} />
        <Stack.Screen name='Signin' component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
