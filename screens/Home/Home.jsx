import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../styles/theme.style';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import videoImage from '../../assets/images/video.png';
import trendingPersonImage from '../../assets/images/trendingperson1.png';
import recentImage from '../../assets/images/Recent1.png';
import avatarImage from '../../assets/images/Avatar.png';

const TrendingData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const TrendingItem = ({ title, onPress }) => (
  <View style={styles.item}>
    <View style={styles.video}>
      <Image source={videoImage} style={styles.videoImage} />
      <View style={styles.duration}>
        <Text
          style={{
            fontFamily: theme.FONT_REGULAR,
            fontSize: theme.FONT_SIZE_SMALL,
            color: theme.NEUTRAL0_COLOR,
            backgroundColor: theme.NEUTRAL50_COLOR,
            paddingVertical: 4,
            width: 42,
            paddingHorizontal: 8,
            textAlign: 'center',
            borderRadius: 8,
          }}
        >
          15:10
        </Text>
      </View>
      <View style={styles.rating}>
        <CustomIcon name='Star' color={theme.NEUTRAL0_COLOR} size={16} />
        <Text
          style={{
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_LABEL,
            color: theme.NEUTRAL0_COLOR,
            marginLeft: 4,
          }}
        >
          4, 5
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            width: 48,
            height: 48,
            backgroundColor: theme.NEUTRAL50_COLOR,
            borderRadius: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPress}
        >
          <CustomIcon name='Play' size={20} color={theme.NEUTRAL0_COLOR} />
        </TouchableOpacity>
      </View>
      <View style={styles.save}>
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
          <CustomIcon name='Bookmark' size={20} />
        </TouchableOpacity>
      </View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
      }}
    >
      <Text
        style={{
          color: theme.NEUTRAL90_COLOR,
          fontSize: theme.FONT_SIZE_P,
          fontFamily: theme.FONT_BOLD,
        }}
      >
        How to make sushi at home
      </Text>
      <TouchableOpacity>
        <CustomIcon name='More' size={20} color={theme.NEUTRAL90_COLOR} />
      </TouchableOpacity>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 12,
      }}
    >
      <Image source={trendingPersonImage} />
      <Text
        style={{
          color: theme.NEUTRAL40_COLOR,
          fontFamily: theme.FONT_REGULAR,
          fontSize: theme.FONT_SIZE_SMALL,
          marginLeft: 8,
        }}
      >
        By Niki Samantha{' '}
      </Text>
    </View>
  </View>
);

const RecentItem = () => (
  <View>
    <View>
      <Image source={recentImage} />
      <View style={{ width: '90%', marginTop: 8 }}>
        <Text
          style={{
            color: theme.NEUTRAL90_COLOR,
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_BOLD,
          }}
        >
          Indonesian chicken burger
        </Text>
        <Text
          style={{
            color: theme.NEUTRAL40_COLOR,
            fontSize: theme.FONT_SIZE_TINY,
            fontFamily: theme.FONT_REGULAR,
          }}
        >
          By Adrianna Curl
        </Text>
      </View>
    </View>
  </View>
);

const Home = ({ navigation }) => {
  function toRecipe() {
    return navigation.navigate('RecipeDetail');
  }
  const renderItem = ({ item }) => (
    <TrendingItem title={item.title} onPress={toRecipe} />
  );
  const renderItem2 = ({ item }) => <RecentItem />;

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
              data={TrendingData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={{ marginLeft: 20 }}
            />
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
              data={TrendingData}
              renderItem={renderItem2}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={{ marginLeft: 20 }}
            />
          </View>
        </View>
        <View style={[styles.TrendingContainer, { marginBottom: 120 }]}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
            }}
          >
            {[1, 2, 3, 4].map((e) => (
              <View>
                <Image source={avatarImage} />
                <Text
                  style={{
                    color: theme.NEUTRAL90_COLOR,
                    fontSize: theme.FONT_SIZE_SMALL,
                    fontFamily: theme.FONT_BOLD,
                    width: '50%',
                    textAlign: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 8,
                  }}
                >
                  Troyan Smith
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeadingContainer: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    width: '55%',
  },
  Heading: {
    color: theme.NEUTRAL90_COLOR,
    fontFamily: theme.FONT_BOLD,
    fontSize: theme.FONT_SIZE_H4,
  },
  SearchContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  SearchFieldContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: theme.NEUTRAL20_COLOR,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  SearchField: {
    color: theme.NEUTRAL30_COLOR,
    fontSize: theme.FONT_SIZE_LABEL,
    fontFamily: theme.FONT_REGULAR,
    width: '100%',
    left: 12,
  },
  TrendingContainer: {},
  TrendingTop: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CategoryTitle: {
    color: theme.NEUTRAL90_COLOR,
    fontFamily: theme.FONT_BOLD,
    fontSize: theme.FONT_SIZE_H5,
  },
  video: {
    position: 'relative',
    width: 280,
    height: 180,
  },
  videoImage: {
    position: 'absolute',
  },
  rating: {
    position: 'absolute',
    backgroundColor: theme.NEUTRAL30_COLOR,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    left: 8,
    top: 8,
  },
  duration: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  play: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
  save: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  item: {
    marginRight: 16,
  },
});

export default Home;
