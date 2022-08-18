// In App.js in a new project
import 'react-native-get-random-values';
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
import Signup from './screens/Signup/Signup';
import Search from './screens/Search/Search';
import RootNavigation from './navigation/index';
import { decode, encode } from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createNativeStackNavigator();

function App() {
  // const [loading, setLoading] = React.useState(true);
  // const [user, setUser] = React.useState(null);

  // useEffect(() => {
  //       const docRef = doc(db, 'users', userId);
  //       firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data()
  //           setLoading(false)
  //           setUser(userData)
  //         })
  //         .catch((error) => {
  //           setLoading(false)
  //         });
  //     } else {
  //       setLoading(false)
  //     }
  //   });
  // }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    IcoMoon: require('./assets/icomoon/icomoon.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <RootNavigation />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}
    //   >
    //     {user ? (
    //       <>
    //         <Stack.Screen name='Onboarding' component={OnboardingScreen} />
    //         <Stack.Screen
    //           name='Tabs'
    //           component={TabsScreen}
    //           //initialParams={{ user: user }}
    //         />
    //         {/* {(props) => <TabsScreen {...props} extraData={user} />} */}
    //         {/* </Stack.Screen> */}
    //         <Stack.Screen name='RecipeDetail' component={RecipeDetail} />
    //         <Stack.Screen name='Search' component={Search} />
    //       </>
    //     ) : (
    //       <>
    //         {/* <Stack.Screen name='Details' component={DetailsScreen} /> */}
    //         <Stack.Screen name='Signup' component={Signup} />
    //         <Stack.Screen name='Signin' component={Signin} />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;
