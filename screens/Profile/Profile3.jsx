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
import VideoRecipe from '../../components/VideoRecipe/VideoRecipe';
import { TrendingData } from '../../mockData';
import ImageRecipe from '../../components/ImageRecipe/ImageRecipe';
import styles from '../../styles/styles';
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
          renderItem={VideoRecipe}
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
          renderItem={ImageRecipe}
          keyExtractor={identity}
          style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 20 }}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
});

export default Example;
