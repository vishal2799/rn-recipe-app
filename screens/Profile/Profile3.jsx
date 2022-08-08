import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Tabs } from 'react-native-collapsible-tab-view';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import AvatarImage from '../../assets/images/Avatar3.png';
import videoImage from '../../assets/images/video.png';
import trendingPersonImage from '../../assets/images/trendingperson1.png';
import videoImage2 from '../../assets/images/video2.png';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HEADER_HEIGHT = 250;
const DATA = [0, 1, 2, 3, 4];
const identity = (v) => v + '';

const Header = () => {
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 12 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: theme.NEUTRAL100_COLOR,
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_H4,
          }}
        >
          My Profile
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
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ width: '60%' }}>
            <Image source={AvatarImage} />
            <Text
              style={{
                color: theme.NEUTRAL90_COLOR,
                fontFamily: theme.FONT_BOLD,
                fontSize: theme.FONT_SIZE_H5,
                marginTop: 16,
              }}
            >
              Alessandra Blair
            </Text>
            <Text
              style={{
                color: theme.NEUTRAL40_COLOR,
                fontFamily: theme.FONT_REGULAR,
                fontSize: theme.FONT_SIZE_LABEL,
                marginTop: 16,
              }}
            >
              Hello world I’m Alessandra Blair, I’m from Italy 🇮🇹 I love cooking
              so much!
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: theme.NEUTRAL0_COLOR,
              borderRadius: 10,
              borderColor: theme.PRIMARY50_COLOR,
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: theme.FONT_BOLD,
                fontSize: theme.FONT_SIZE_LABEL,
                color: theme.PRIMARY50_COLOR,
                textAlign: 'center',
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          {[1, 2, 3, 4].map((e) => (
            <View>
              <Text
                style={{
                  fontFamily: theme.FONT_REGULAR,
                  fontSize: theme.FONT_SIZE_SMALL,
                  color: theme.NEUTRAL40_COLOR,
                  textAlign: 'center',
                }}
              >
                Recipe
              </Text>
              <Text
                style={{
                  fontFamily: theme.FONT_BOLD,
                  fontSize: theme.FONT_SIZE_H5,
                  color: theme.NEUTRAL90_COLOR,
                  textAlign: 'center',
                }}
              >
                3
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

function MyTabBar2({
  tabNames,
  label,
  indexDecimal,
  navigation,
  onPress,
  onLongPress,
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}
    >
      {tabNames.map((route, index) => {
        // const { options } = descriptors[route.key];
        // const label =
        //   options.tabBarLabel !== undefined
        //     ? options.tabBarLabel
        //     : options.title !== undefined
        //     ? options.title
        //     : route.name;

        // const onPress = () => {
        //   const event = navigation.emit({
        //     type: "tabPress",
        //     target: route.key,
        //     canPreventDefault: true,
        //   });

        //   if (!isFocused && !event.defaultPrevented) {
        //     // The `merge: true` option makes sure that the params inside the tab screen are preserved
        //     navigation.navigate({ name: route.name, merge: true });
        //   }
        // };

        // const onLongPress = () => {
        //   navigation.emit({
        //     type: "tabLongPress",
        //     target: route.key,
        //   });
        // };

        // const inputRange = state.routes.map((_, i) => i);
        // const opacity = position.interpolate({
        //   inputRange,
        //   outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        // });

        const textStyle = useAnimatedStyle(() => {
          return {
            // fontWeight:
            //   Math.abs(index - indexDecimal.value) < 0.5 ? "bold" : undefined,
            // transform: [
            //   {
            //     translateX: interpolate(
            //       indexDecimal.value,
            //       [index - 1, index, index + 1],
            //       [0, 8, 0],
            //       Animated.Extrapolate.CLAMP
            //     ),
            //   },
            // ],
            color: interpolateColor(
              indexDecimal.value,
              [index - 1, index, index + 1],
              ['#e23e3e', 'white', '#e23e3e']
            ),
            backgroundColor:
              Math.abs(index - indexDecimal.value) < 0.5
                ? '#e23e3e'
                : 'transparent',
          };
        });

        return (
          <TouchableOpacity
            accessibilityRole='button'
            //accessibilityState={isFocused ? { selected: true } : {}}
            //accessibilityLabel={options.tabBarAccessibilityLabel}
            //testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={[textStyle, styles.itemstyle]}>
              {route}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

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

const TrendingItem = ({ title }) => (
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

const TrendingItem2 = ({ title }) => (
  <View style={styles.item2}>
    <View style={styles.video2}>
      <Image source={videoImage2} style={styles.videoImage} />
      <View style={styles.details}>
        <Text
          style={{
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_P,
            color: theme.NEUTRAL0_COLOR,
          }}
        >
          How to make Italian Spaghetti at home
        </Text>
        <Text
          style={{
            fontFamily: theme.FONT_REGULAR,
            fontSize: theme.FONT_SIZE_SMALL,
            color: theme.NEUTRAL0_COLOR,
          }}
        >
          12 Ingredients | 40 min
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
          <CustomIcon name='More' size={20} color={theme.PRIMARY50_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

function Video() {
  const renderItem = ({ item }) => <TrendingItem title={item.title} />;

  return (
    <View style={{ marginBottom: 100 }}>
      <FlatList
        data={TrendingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ marginLeft: 20, marginTop: 20 }}
      />
    </View>
  );
}

function Recipe() {
  const renderItem2 = ({ item }) => <TrendingItem2 title={item.title} />;

  return (
    <View style={{ marginBottom: 100 }}>
      <FlatList
        data={TrendingData}
        renderItem={renderItem2}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: 20, marginTop: 20 }}
      />
    </View>
  );
}

const Example = React.forwardRef(({ emptyContacts, ...props }, ref) => {
  const renderItem = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

  const makeLabel = useCallback(
    (label) => (props) =>
      (
        <TabItem
          index={props.index}
          indexDecimal={props.indexDecimal}
          label={label}
        />
      ),
    []
  );

  return (
    <Tabs.Container
      ref={ref}
      {...props}
      renderHeader={Header}
      renderTabBar={MyTabBar2}
    >
      <Tabs.Tab name='Video' label={makeLabel('Video')}>
        <Tabs.FlatList
          data={TrendingData}
          renderItem={TrendingItem}
          keyExtractor={identity}
          style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 110 }}
        />
      </Tabs.Tab>
      <Tabs.Tab name='Recipe' label={makeLabel('Recipe')}>
        {/* <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView> */}
        <Tabs.FlatList
          data={TrendingData}
          renderItem={TrendingItem2}
          keyExtractor={identity}
          style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 20 }}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
});

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
  itemstyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
    borderRadius: 10,
  },
  video: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  video2: {
    position: 'relative',
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  videoImage: {
    position: 'absolute',
    width: '100%',
    borderRadius: 10,
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
    right: 16,
    bottom: 8,
  },
  details: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    width: '50%',
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
    //marginRight: 16,
  },
});
export default Example;
