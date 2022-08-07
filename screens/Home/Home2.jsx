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
import theme from '../../styles/theme.style';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import videoImage from '../../assets/images/video.png';
import trendingPersonImage from '../../assets/images/trendingperson1.png';
import recentImage from '../../assets/images/Recent1.png';
import avatarImage from '../../assets/images/Avatar.png';
import popularImage from '../../assets/images/popular1.png';

const HEADER_HEIGHT = 250;
const DATA = [0, 1, 2, 3, 4];
const identity = (v) => v + '';

const Header = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 12,
        height: 500,
        backgroundColor: 'blue',
      }}
    ></View>
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
              ['green', 'white', 'green']
            ),
            backgroundColor:
              Math.abs(index - indexDecimal.value) < 0.5
                ? 'red'
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

const PopularItem = () => (
  <View style={{ marginRight: 16 }}>
    <View
      style={{
        position: 'relative',
        backgroundColor: theme.NEUTRAL10_COLOR,
        width: 150,
        height: 176,
        zIndex: 1,
        marginTop: 60,
        borderRadius: 12,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_LABEL,
            color: theme.NEUTRAL90_COLOR,
            textAlign: 'center',
            paddingHorizontal: 8,
          }}
        >
          Pepper sweetcorn ramen
        </Text>
      </View>
      <View style={{ position: 'absolute', bottom: 12, left: 12 }}>
        <Text
          style={{
            fontFamily: theme.FONT_REGULAR,
            fontSize: theme.FONT_SIZE_SMALL,
            color: theme.NEUTRAL30_COLOR,
          }}
        >
          Time
        </Text>
        <Text
          style={{
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_SMALL,
            color: theme.NEUTRAL90_COLOR,
          }}
        >
          10 MINS
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 99,
          borderRadius: 50,
          top: -60,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={popularImage} style={{ borderRadius: 55 }} />
      </View>
      <View style={{ position: 'absolute', right: 12, bottom: 12 }}>
        <TouchableOpacity
          style={{
            width: 24,
            height: 24,
            backgroundColor: theme.NEUTRAL0_COLOR,
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomIcon name='Bookmark' size={16} color={theme.NEUTRAL90_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const Home = React.forwardRef(
  ({ emptyContacts, navigation, ...props }, ref) => {
    const renderItem5 = React.useCallback(({ index }) => {
      return (
        <View
          style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]}
        />
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

    function toRecipe() {
      return navigation.navigate('RecipeDetail');
    }
    const renderItem = ({ item }) => (
      <TrendingItem title={item.title} onPress={toRecipe} />
    );

    const renderItem2 = ({ item }) => <RecentItem />;

    const renderItem3 = ({ item }) => <PopularItem />;

    const [text, onChangeText] = React.useState('Hi');
    return (
      //   <SafeAreaView
      //     style={{
      //       flex: 1,
      //       backgroundColor: 'green',
      //     }}
      //   >
      //     <ScrollView style={{ backgroundColor: 'white' }}>
      //       <View style={styles.HeadingContainer}>
      //         <Text style={styles.Heading}>Find best recipes for cooking</Text>
      //       </View>
      //       <View style={styles.SearchContainer}>
      //         <View style={styles.SearchFieldContainer}>
      //           <CustomIcon
      //             name='Search'
      //             size={20}
      //             color={theme.NEUTRAL20_COLOR}
      //           />
      //           <TextInput
      //             onChangeText={onChangeText}
      //             value={text}
      //             placeholder='Search recipes'
      //             style={styles.SearchField}
      //           />
      //         </View>
      //       </View>
      //       <View style={styles.TrendingContainer}>
      //         <View style={styles.TrendingTop}>
      //           <Text style={styles.CategoryTitle}>Trending</Text>
      //           <TouchableOpacity
      //             style={{
      //               flexDirection: 'row',
      //               alignItems: 'flex-start',
      //             }}
      //           >
      //             <Text
      //               style={{
      //                 color: theme.PRIMARY50_COLOR,
      //                 fontSize: theme.FONT_SIZE_LABEL,
      //                 fontFamily: theme.FONT_BOLD,
      //                 marginRight: 4,
      //               }}
      //             >
      //               See All
      //             </Text>
      //             <CustomIcon
      //               name='Arrow-Right'
      //               size={20}
      //               color={theme.PRIMARY50_COLOR}
      //             />
      //           </TouchableOpacity>
      //         </View>
      //         <View>
      //           <FlatList
      //             data={TrendingData}
      //             renderItem={renderItem}
      //             keyExtractor={(item) => item.id}
      //             horizontal={true}
      //             style={{ marginLeft: 20 }}
      //           />
      //         </View>
      //       </View>
      //       <View style={[styles.TrendingContainer]}>
      //         <View style={styles.TrendingTop}>
      //           <Text style={styles.CategoryTitle}>Popular Categories</Text>
      //         </View>
      //         <View>
      //           <FlatList
      //             data={TrendingData}
      //             renderItem={renderItem3}
      //             keyExtractor={(item) => item.id}
      //             horizontal={true}
      //             style={{ marginLeft: 20 }}
      //           />
      //         </View>
      //       </View>
      //       <View style={[styles.TrendingContainer]}>
      //         <View style={styles.TrendingTop}>
      //           <Text style={styles.CategoryTitle}>Recent Recipe</Text>
      //           <TouchableOpacity
      //             style={{
      //               flexDirection: 'row',
      //               alignItems: 'flex-start',
      //             }}
      //           >
      //             <Text
      //               style={{
      //                 color: theme.PRIMARY50_COLOR,
      //                 fontSize: theme.FONT_SIZE_LABEL,
      //                 fontFamily: theme.FONT_BOLD,
      //                 marginRight: 4,
      //               }}
      //             >
      //               See All
      //             </Text>
      //             <CustomIcon
      //               name='Arrow-Right'
      //               size={20}
      //               color={theme.PRIMARY50_COLOR}
      //             />
      //           </TouchableOpacity>
      //         </View>
      //         <View>
      //           <FlatList
      //             data={TrendingData}
      //             renderItem={renderItem2}
      //             keyExtractor={(item) => item.id}
      //             horizontal={true}
      //             style={{ marginLeft: 20 }}
      //           />
      //         </View>
      //       </View>
      //       <View style={[styles.TrendingContainer, { marginBottom: 120 }]}>
      //         <View style={styles.TrendingTop}>
      //           <Text style={styles.CategoryTitle}>Recent Recipe</Text>
      //           <TouchableOpacity
      //             style={{
      //               flexDirection: 'row',
      //               alignItems: 'flex-start',
      //             }}
      //           >
      //             <Text
      //               style={{
      //                 color: theme.PRIMARY50_COLOR,
      //                 fontSize: theme.FONT_SIZE_LABEL,
      //                 fontFamily: theme.FONT_BOLD,
      //                 marginRight: 4,
      //               }}
      //             >
      //               See All
      //             </Text>
      //             <CustomIcon
      //               name='Arrow-Right'
      //               size={20}
      //               color={theme.PRIMARY50_COLOR}
      //             />
      //           </TouchableOpacity>
      //         </View>
      //         <View
      //           style={{
      //             flexDirection: 'row',
      //             justifyContent: 'space-around',
      //             paddingHorizontal: 10,
      //           }}
      //         >
      //           {[1, 2, 3, 4].map((e) => (
      //             <View>
      //               <Image source={avatarImage} />
      //               <Text
      //                 style={{
      //                   color: theme.NEUTRAL90_COLOR,
      //                   fontSize: theme.FONT_SIZE_SMALL,
      //                   fontFamily: theme.FONT_BOLD,
      //                   width: '50%',
      //                   textAlign: 'center',
      //                   marginLeft: 'auto',
      //                   marginRight: 'auto',
      //                   marginTop: 8,
      //                 }}
      //               >
      //                 Troyan Smith
      //               </Text>
      //             </View>
      //           ))}
      //         </View>
      //       </View>
      //     </ScrollView>
      //   </SafeAreaView>
      <Tabs.Container
        ref={ref}
        {...props}
        renderHeader={Header}
        renderTabBar={MyTabBar2}
      >
        <Tabs.Tab name='Video' label={makeLabel('Video')}>
          <Tabs.FlatList
            data={DATA}
            renderItem={renderItem5}
            keyExtractor={identity}
          />
        </Tabs.Tab>
        <Tabs.Tab name='Recipe' label={makeLabel('Recipe')}>
          <Tabs.ScrollView>
            <View style={[styles.box, styles.boxA]} />
            <View style={[styles.box, styles.boxB]} />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    );
  }
);

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
