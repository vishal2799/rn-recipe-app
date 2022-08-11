// In App.js in a new project

import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import CustomIcon from './components/CustomIcon/CustomIcon';
import OnboardingScreen from './screens/Onboarding/Onboarding';
import TabsScreen from './components/Tabs/Tabs';
import HomeScreen from './screens/Home/Home';
import RecipeDetail from './screens/RecipeDetail/RecipeDetail';
import Signin from './screens/Signin/Signin';
import Login from './screens/Signin/Signin';
import Signup from './screens/Signup/Signup';
import Search from './screens/Search/Search';
// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={tw`text-red-500`}>Home Screen</Text>
//       <Text style={{ fontFamily: 'Poppins_400Regular' }}>First Screen</Text>
//       <Button
//         title='Go to Details'
//         onPress={() => navigation.navigate('Details')}
//       />
//       <CustomIcon name='Clock' size={30} />
//     </View>
//   );
// }

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title='Go to Details... again'
        onPress={() => navigation.push('Details')}
      />
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    IcoMoon: require('./assets/icomoon/icomoon.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Signin'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Onboarding' component={OnboardingScreen} />
        <Stack.Screen name='Tabs' component={TabsScreen} />
        <Stack.Screen name='RecipeDetail' component={RecipeDetail} />
        <Stack.Screen name='Search' component={Search} />
        {/* <Stack.Screen name='Details' component={DetailsScreen} /> */}
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Signin' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
