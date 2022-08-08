import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomIcon from '../CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import HomeScreen from '../../screens/Home/Home';
import CreateScreen from '../../screens/Create/Create';
import SavedScreen from '../../screens/Saved/Saved';
import ProfileScreen from '../../screens/Profile/Profile3';
import NotificationScreen from '../../screens/Notification/Notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -45,
      justifyContent: 'center',
      alignItems: 'center',
      ...style.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: theme.PRIMARY50_COLOR,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

function Tabs() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            elevation: 0,
            backgroundColor: '#ffffff',
            height: 85,
            //   ...style.shadow,
          },
        }}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomIcon
                  name='HomeActive'
                  color={
                    focused ? theme.PRIMARY50_COLOR : theme.NEUTRAL30_COLOR
                  }
                  size={24}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name='Saved'
          component={SavedScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomIcon
                  name='BookmarkActive'
                  color={
                    focused ? theme.PRIMARY50_COLOR : theme.NEUTRAL30_COLOR
                  }
                  size={24}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name='plus'
          component={CreateScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomIcon name='Plus' color={theme.NEUTRAL0_COLOR} size={21} />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name='Notification'
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomIcon
                  name='NotificationActive'
                  color={
                    focused ? theme.PRIMARY50_COLOR : theme.NEUTRAL30_COLOR
                  }
                  size={24}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomIcon
                  name='ProfileActive'
                  color={
                    focused ? theme.PRIMARY50_COLOR : theme.NEUTRAL30_COLOR
                  }
                  size={24}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

export default Tabs;

const style = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: '#7F5DF0',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
