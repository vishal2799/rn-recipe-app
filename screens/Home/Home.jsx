import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../styles/theme.style';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import avatarImage from '../../assets/images/Avatar.png';
import RecentCard from '../../components/RecentCard/RecentCard';
import styles from '../../styles/styles';
import VideoRecipe from '../../components/VideoRecipe/VideoRecipe';
import PopularCard from '../../components/PopularCard/PopularCard';
import { data, recipeData } from '../../mockData';
import Creator from '../../components/Creator/Creator';
const listTab = [
  {
    status: 'All',
  },
  {
    status: 'Purple',
  },
  {
    status: 'Green',
  },
  {
    status: 'Green2',
  },
  {
    status: 'Green3',
  },
];

const Home = ({ navigation }) => {
  const [status, setStatus] = useState('All');
  const [dataList, setDataList] = useState(data);
  const setStatusFilter = (status) => {
    if (status !== 'All') {
      setDataList([...data.filter((e) => e.status === status)]);
    } else {
      setDataList(data);
    }
    setStatus(status);
  };

  const separator = () => {
    return <View style={{ height: 1, backgroundColor: '#f1f1f1' }} />;
  };

  function toRecipe() {
    return navigation.navigate('RecipeDetail');
  }
  const renderItem = ({ item }) => <VideoRecipe data={item} />;
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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'green',
      }}
    >
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>Find best recipes for cooking</Text>
        </View>
        <View style={styles.SearchContainer}>
          <View style={styles.SearchFieldContainer}>
            <CustomIcon name='Search' size={20} color={theme.NEUTRAL20_COLOR} />
            <TextInput
              onChangeText={onChangeText}
              value={text}
              placeholder='Search recipes'
              style={styles.SearchField}
            />
          </View>
        </View>
        <View style={styles.TrendingContainer}>
          <View style={styles.TrendingTop}>
            <Text style={styles.CategoryTitle}>Trending</Text>
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
              data={recipeData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={{ marginLeft: 20 }}
            />
          </View>
        </View>
        <View style={[styles.TrendingContainer]}>
          <View style={styles.TrendingTop}>
            <Text style={styles.CategoryTitle}>Popular Categories</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <ScrollView
              style={styles.listTab}
              horizontal={true}
              nestedScrollEnabled={true}
            >
              {listTab.map((e) => (
                <TouchableOpacity
                  style={[
                    styles.btnTab,
                    status === e.status && styles.btnTabActive,
                  ]}
                  onPress={() => setStatusFilter(e.status)}
                >
                  <Text
                    style={[
                      styles.textTab,
                      status === e.status && styles.textTabActive,
                    ]}
                  >
                    {e.status}
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
            <Text style={styles.CategoryTitle}>Recent Recipe</Text>
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
              data={recipeData}
              renderItem={renderRecentItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={{ marginLeft: 20 }}
            />
          </View>
        </View>
        <View style={[styles.TrendingContainer, { marginBottom: 120 }]}>
          <View style={[styles.TrendingTop, { marginTop: 15 }]}>
            <Text style={styles.CategoryTitle}>Popular Creators</Text>
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
            {[1, 2, 3, 4].map((e) => (
              <Creator data={recipeData} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
