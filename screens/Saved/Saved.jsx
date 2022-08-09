import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import theme from '../../styles/theme.style';
import VideoRecipe from '../../components/VideoRecipe/VideoRecipe';
import ImageRecipe from '../../components/ImageRecipe/ImageRecipe';
import MyTabBar from '../../components/TabBar/TabBar';
import { recipeData } from '../../mockData';

const Tab = createMaterialTopTabNavigator();

function Video() {
  const renderItem = ({ item }) => <VideoRecipe data={item} />;

  return (
    <View style={{ marginBottom: 100 }}>
      <FlatList
        data={recipeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ marginLeft: 20, marginTop: 20 }}
      />
    </View>
  );
}

function Recipe() {
  const renderItem2 = ({ item }) => <ImageRecipe title={item.title} />;

  return (
    <View style={{ marginBottom: 100 }}>
      <FlatList
        data={recipeData}
        renderItem={renderItem2}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 20, marginTop: 20 }}
      />
    </View>
  );
}

function Saved() {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              color: theme.NEUTRAL100_COLOR,
              fontFamily: theme.FONT_BOLD,
              fontSize: theme.FONT_SIZE_H4,
              paddingHorizontal: 22,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Saved Recipes
          </Text>
        </View>
        <Tab.Navigator
          tabBar={(props) => <MyTabBar {...props} />}
          screenOptions={{
            tabBarScrollEnabled: true,
          }}
          sceneContainerStyle={{ backgroundColor: 'white' }}
        >
          <Tab.Screen name='Video' component={Video} />
          <Tab.Screen name='Recipe' component={Recipe} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}

export default Saved;
