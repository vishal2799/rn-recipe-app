import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import Notification from '../../components/Notification/Notification';
import MyTabBar from '../../components/TabBar/TabBar';
import { TrendingData } from '../../mockData';
const Tab = createMaterialTopTabNavigator();

function All() {
  const renderItem = ({ item }) => <Notification title={item.title} />;

  return (
    <View style={{ marginBottom: 100 }}>
      <Text
        style={{
          color: theme.NEUTRAL90_COLOR,
          fontFamily: theme.FONT_BOLD,
          fontSize: theme.FONT_SIZE_LABEL,
          marginLeft: 16,
          marginVertical: 12,
        }}
      >
        Today
      </Text>
      <FlatList
        data={TrendingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}

function Notifications() {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 22,
          }}
        >
          <Text
            style={{
              color: theme.NEUTRAL100_COLOR,
              fontFamily: theme.FONT_BOLD,
              fontSize: theme.FONT_SIZE_H4,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Notifications
          </Text>
          <TouchableOpacity
            style={{
              width: 32,
              height: 32,
              backgroundColor: theme.NEUTRAL0_COLOR,
              borderRadius: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomIcon name='More' size={20} color={theme.NEUTRAL100_COLOR} />
          </TouchableOpacity>
        </View>
        <Tab.Navigator
          tabBar={(props) => <MyTabBar {...props} />}
          sceneContainerStyle={{ backgroundColor: 'white' }}
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarContentContainerStyle: {
              backgroundColor: 'blue',
            },
          }}
        >
          <Tab.Screen name='All' component={All} />
          <Tab.Screen name='Unread' component={All} />
          <Tab.Screen name='Read' component={All} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}

export default Notifications;
