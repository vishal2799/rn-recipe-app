import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  useColorScheme,
} from 'react-native';
import theme from '../../styles/theme.style';
import VideoRecipe from '../../components/VideoRecipe/VideoRecipe';
import ImageRecipe from '../../components/ImageRecipe/ImageRecipe';
import MyTabBar from '../../components/TabBar/TabBar';
import { UserContext } from '../../context/user';
import SearchBar from '../../components/SearchBar/SearchBar';
import List from '../../components/SearchList/SearchList';

const Tab = createMaterialTopTabNavigator();

function Video({ data }) {
  const { isLoading, savedRecipes, userDetails } =
    React.useContext(UserContext);

  const renderItem = ({ item }) => <VideoRecipe data={item} />;

  return (
    <View style={{ marginBottom: 100 }}>
      <FlatList
        data={savedRecipes.filter((e) => e.type === 'video')}
        renderItem={renderItem}
        style={{ marginHorizontal: 20, marginTop: 20 }}
      />
    </View>
  );
}

function Recipe({ data }) {
  const renderItem2 = ({ item }) => <ImageRecipe data={item} />;
  const { isLoading, savedRecipes, userDetails } =
    React.useContext(UserContext);

  return (
    <View style={{ marginBottom: 100 }}>
      <FlatList
        data={savedRecipes.filter((e) => e.type === 'recipe')}
        renderItem={renderItem2}
        style={{ paddingHorizontal: 20, marginTop: 20 }}
      />
    </View>
  );
}

function Saved() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const { isLoading, recipes, userDetails, allRecipes } =
    React.useContext(UserContext);
  const colorScheme = useColorScheme();

  function list2() {
    return (
      <List
        searchPhrase={searchPhrase}
        data={allRecipes}
        setClicked={setClicked}
      />
    );
  }

  let layout;

  if (isLoading) {
    layout = (
      <View style={{ marginTop: 100 }}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    layout = (
      <>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor:
              colorScheme === 'light' ? 'white' : theme.NEUTRAL100_COLOR,
          }}
        >
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                color:
                  colorScheme === 'light'
                    ? theme.NEUTRAL100_COLOR
                    : theme.NEUTRAL0_COLOR,

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

          <View style={{ backgroundColor: 'black' }}>
            {!clicked && <Text>Search Recipes</Text>}
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </View>

          <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
            screenOptions={{
              tabBarScrollEnabled: true,
            }}
            sceneContainerStyle={{
              backgroundColor:
                colorScheme === 'light'
                  ? theme.NEUTRAL0_COLOR
                  : theme.NEUTRAL100_COLOR,
            }}
          >
            <Tab.Screen name='User' component={list2} />
            <Tab.Screen name='Recipe' component={Recipe} />
          </Tab.Navigator>
        </SafeAreaView>
      </>
    );
  }
  return layout;
}

export default Saved;
