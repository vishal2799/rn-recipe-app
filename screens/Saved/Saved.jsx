import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import videoImage from '../../assets/images/video.png';
import trendingPersonImage from '../../assets/images/trendingperson1.png';
import videoImage2 from '../../assets/images/video2.png';

const Tab = createMaterialTopTabNavigator();

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

function MyTabs() {
  function MyTabBar({ state, descriptors, navigation, position }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          height: 58,
          paddingHorizontal: 20,
          paddingVertical: 12,
          justifyContent: 'space-between',
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                backgroundColor: isFocused
                  ? theme.PRIMARY50_COLOR
                  : 'transparent',
                paddingVertical: 8,
                paddingHorizontal: 12,
                width: 160,
                textAlign: 'center',
                borderRadius: 10,
              }}
            >
              <Animated.Text
                style={[
                  {
                    //opacity,
                    fontFamily: theme.FONT_BOLD,
                    fontSize: theme.FONT_SIZE_SMALL,
                    color: isFocused
                      ? theme.NEUTRAL0_COLOR
                      : theme.PRIMARY50_COLOR,
                    textAlign: 'center',
                  },
                ]}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

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

const styles = StyleSheet.create({
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
    marginRight: 16,
  },
});

export default MyTabs;
