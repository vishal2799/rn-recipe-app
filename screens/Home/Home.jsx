import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../styles/theme.style';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import avatarImage from '../../assets/images/Avatar.png';
import RecentCard from '../../components/RecentCard/RecentCard';
import styles from '../../styles/styles';
import VideoRecipe from '../../components/VideoRecipe/VideoRecipe';
import PopularCard from '../../components/PopularCard/PopularCard';
import Creator from '../../components/Creator/Creator';
import { UserContext } from '../../context/user';
import { StatusBar } from 'expo-status-bar';

const Home = ({ navigation }) => {
  const { isLoading, creators, categoriesList, allRecipes } =
    React.useContext(UserContext);
  const colorScheme = useColorScheme();

  const [category, setCategory] = useState('All');
  const [dataList, setDataList] = useState(allRecipes);
  const setCategoryFilter = (category) => {
    if (category !== 'All') {
      setDataList([...allRecipes.filter((e) => e.category === category)]);
    } else {
      setDataList(allRecipes);
    }
    setCategory(category);
  };

  const separator = () => {
    return <View style={{ height: 1, backgroundColor: '#f1f1f1' }} />;
  };

  const renderItem = ({ item }) => (
    <VideoRecipe data={item} width={280} mr={16} />
  );
  const renderRecentItem = ({ item }) => <RecentCard data={item} />;

  const renderItem3 = ({ item }) => <PopularCard data={item} />;

  const renderItem5 = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.itemLogo}>
          <Image style={styles.itemImage} source={avatarImage} />
        </View>

        <View style={styles.itemBody}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>

        <View style={styles.itemStatus}>
          <Text style={styles.itemName}>{item.status}</Text>
        </View>
      </View>
    );
  };

  const [text, onChangeText] = React.useState('Hi');
  let layout;
  if (isLoading) {
    layout = (
      <View style={{ marginTop: 70 }}>
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
          <ScrollView
            style={{
              backgroundColor:
                colorScheme === 'light' ? 'white' : theme.NEUTRAL100_COLOR,
            }}
          >
            <View style={styles.HeadingContainer}>
              <Text
                style={[
                  styles.Heading,
                  {
                    color:
                      colorScheme === 'light'
                        ? theme.NEUTRAL90_COLOR
                        : theme.NEUTRAL0_COLOR,
                  },
                ]}
              >
                Find best recipes for cooking
              </Text>
            </View>
            <View style={styles.SearchContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <View style={styles.SearchFieldContainer}>
                  <CustomIcon
                    name='Search'
                    size={20}
                    color={theme.NEUTRAL20_COLOR}
                  />
                  {/* <TextInput
                  onChangeText={onChangeText}
                  value=''
                  placeholder='Search recipes'
                  style={styles.SearchField}
                  disabled={true}
                /> */}
                  <Text style={styles.SearchField}>Search</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.TrendingContainer}>
              <View style={styles.TrendingTop}>
                <Text
                  style={[
                    styles.CategoryTitle,
                    {
                      color:
                        colorScheme === 'light'
                          ? theme.NEUTRAL90_COLOR
                          : theme.NEUTRAL0_COLOR,
                    },
                  ]}
                >
                  Trending
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      color: theme.PRIMARY50_COLOR,
                      fontSize: theme.FONT_SIZE_LABEL,
                      fontFamily: theme.FONT_BOLD,
                      marginRight: 4,
                    }}
                  >
                    See All
                  </Text>
                  <CustomIcon
                    name='Arrow-Right'
                    size={20}
                    color={theme.PRIMARY50_COLOR}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={allRecipes}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  style={{ marginLeft: 20 }}
                />
              </View>
            </View>
            <View style={[styles.TrendingContainer]}>
              <View style={styles.TrendingTop}>
                <Text
                  style={[
                    styles.CategoryTitle,
                    {
                      color:
                        colorScheme === 'light'
                          ? theme.NEUTRAL90_COLOR
                          : theme.NEUTRAL0_COLOR,
                    },
                  ]}
                >
                  Popular Categories
                </Text>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <ScrollView
                  style={styles.listTab}
                  horizontal={true}
                  nestedScrollEnabled={true}
                >
                  {categoriesList.map((e) => (
                    <TouchableOpacity
                      style={[
                        styles.btnTab,
                        category == e.name && styles.btnTabActive,
                      ]}
                      onPress={() => setCategoryFilter(e.name)}
                    >
                      <Text
                        style={[
                          styles.textTab,
                          category == e.name && styles.textTabActive,
                        ]}
                      >
                        {e.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View>
                <FlatList
                  style={{ marginLeft: 20, marginBottom: 12 }}
                  data={dataList}
                  horizontal={true}
                  keyExtractor={(e, i) => i.toString()}
                  renderItem={renderItem3}
                  ItemSeparatorComponent={separator}
                />
                {/* <FlatList
                data={TrendingData}
                renderItem={renderItem3}
                keyExtractor={(item) => item.id}
                horizontal={true}
                style={{ marginLeft: 20 }}
              /> */}
              </View>
            </View>
            <View style={[styles.TrendingContainer]}>
              <View style={styles.TrendingTop}>
                <Text
                  style={[
                    styles.CategoryTitle,
                    {
                      color:
                        colorScheme === 'light'
                          ? theme.NEUTRAL90_COLOR
                          : theme.NEUTRAL0_COLOR,
                    },
                  ]}
                >
                  Recent Recipe
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      color: theme.PRIMARY50_COLOR,
                      fontSize: theme.FONT_SIZE_LABEL,
                      fontFamily: theme.FONT_BOLD,
                      marginRight: 4,
                    }}
                  >
                    See All
                  </Text>
                  <CustomIcon
                    name='Arrow-Right'
                    size={20}
                    color={theme.PRIMARY50_COLOR}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={allRecipes}
                  renderItem={renderRecentItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  style={{ marginLeft: 20 }}
                />
              </View>
            </View>
            <View style={[styles.TrendingContainer, { marginBottom: 120 }]}>
              <View style={[styles.TrendingTop, { marginTop: 15 }]}>
                <Text
                  style={[
                    styles.CategoryTitle,
                    {
                      color:
                        colorScheme === 'light'
                          ? theme.NEUTRAL90_COLOR
                          : theme.NEUTRAL0_COLOR,
                    },
                  ]}
                >
                  Popular Creators
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      color: theme.PRIMARY50_COLOR,
                      fontSize: theme.FONT_SIZE_LABEL,
                      fontFamily: theme.FONT_BOLD,
                      marginRight: 4,
                    }}
                  >
                    See All
                  </Text>
                  <CustomIcon
                    name='Arrow-Right'
                    size={20}
                    color={theme.PRIMARY50_COLOR}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingHorizontal: 10,
                }}
              >
                {creators.map((e) => (
                  <Creator data={e} />
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <StatusBar style='light' />
      </>
    );
  }
  return layout;
};

export default Home;
