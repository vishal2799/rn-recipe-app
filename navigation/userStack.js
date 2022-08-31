import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsScreen from '../components/Tabs/Tabs';
import RecipeDetail from '../screens/RecipeDetail/RecipeDetail';
import Search from '../screens/Search/Search';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Tabs' component={TabsScreen} />
        <Stack.Screen name='RecipeDetail' component={RecipeDetail} />
        <Stack.Screen name='Search' component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
