import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Tabs } from 'react-native-collapsible-tab-view';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import VideoRecipe from '../../components/VideoRecipe/VideoRecipe';
import ImageRecipe from '../../components/ImageRecipe/ImageRecipe';
import styles from '../../styles/styles';
import { UserContext } from '../../context/user';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { auth } from '../../config/Firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';

const HEADER_HEIGHT = 250;
const DATA = [0, 1, 2, 3, 4];
const identity = (v) => v + '';

const Header = ({ profile, loading, onPress, same, reset }) => {
  const colorScheme = useColorScheme();

  let layout;
  if (loading && !profile) {
    layout = (
      <View style={{ marginTop: 70 }}>
        <Text>Loading..</Text>
      </View>
    );
  } else {
    layout = (
      <>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 30,
            backgroundColor:
              colorScheme === 'light' ? 'white' : theme.NEUTRAL100_COLOR,
            paddingVertical: 20,
          }}
        >
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
                color:
                  colorScheme === 'light'
                    ? theme.NEUTRAL100_COLOR
                    : theme.NEUTRAL0_COLOR,
                fontFamily: theme.FONT_BOLD,
                fontSize: theme.FONT_SIZE_H4,
              }}
            >
              My Profile {same ? 'same' : 'not same'}
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
              onPress={onPress}
            >
              <CustomIcon
                name='More'
                size={20}
                color={theme.NEUTRAL100_COLOR}
              />
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
                <Image
                  source={{ uri: profile?.profilePhotoUrl }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text
                  style={{
                    color:
                      colorScheme === 'light'
                        ? theme.NEUTRAL90_COLOR
                        : theme.NEUTRAL0_COLOR,
                    fontFamily: theme.FONT_BOLD,
                    fontSize: theme.FONT_SIZE_H5,
                    marginTop: 16,
                  }}
                >
                  {profile?.name}
                </Text>
                <Text
                  style={{
                    color: theme.NEUTRAL40_COLOR,
                    fontFamily: theme.FONT_REGULAR,
                    fontSize: theme.FONT_SIZE_LABEL,
                    marginTop: 16,
                  }}
                >
                  Hello world I’m {profile?.name}, I’m from {profile?.location}{' '}
                  🇮🇹 I love cooking so much!
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor:
                    colorScheme === 'light'
                      ? theme.NEUTRAL100_COLOR
                      : theme.PRIMARY50_COLOR,
                  borderRadius: 10,
                  borderColor: theme.PRIMARY50_COLOR,
                  borderWidth: 1,
                }}
                onPress={() => reset()}
              >
                <Text
                  style={{
                    fontFamily: theme.FONT_BOLD,
                    fontSize: theme.FONT_SIZE_LABEL,
                    color:
                      colorScheme === 'light'
                        ? theme.NEUTRAL100_COLOR
                        : theme.NEUTRAL0_COLOR,
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
              {/* {[
                { name: 'Recipe', count: profile?.recipes.length },
                { name: 'Followers', count: profile?.followers.length },
                { name: 'Following', count: profile?.following.length },
                { name: 'Videos', count: profile?.videos.length },
              ].map((e) => (
                <View>
                  <Text
                    style={{
                      fontFamily: theme.FONT_REGULAR,
                      fontSize: theme.FONT_SIZE_SMALL,
                      color: theme.NEUTRAL40_COLOR,
                      textAlign: 'center',
                    }}
                  >
                    {e.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.FONT_BOLD,
                      fontSize: theme.FONT_SIZE_H5,
                      color:
                        colorScheme === 'light'
                          ? theme.NEUTRAL90_COLOR
                          : theme.NEUTRAL0_COLOR,
                      textAlign: 'center',
                    }}
                  >
                    {e.count}
                  </Text>
                </View>
              ))} */}
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor:
              colorScheme === 'light'
                ? theme.NEUTRAL100_COLOR
                : theme.NEUTRAL0_COLOR,
            height: 1,
          }}
        ></View>
      </>
    );
  }
  return layout;
};

function MyTabBar2({
  tabNames,
  label,
  indexDecimal,
  navigation,
  onPress,
  onLongPress,
}) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor:
          colorScheme === 'light'
            ? theme.NEUTRAL0_COLOR
            : theme.NEUTRAL100_COLOR,
      }}
    >
      {tabNames.map((route, index) => {
        const textStyle = useAnimatedStyle(() => {
          return {
            color:
              colorScheme !== 'light'
                ? interpolateColor(
                    indexDecimal.value,
                    [index - 1, index, index + 1],
                    ['#e23e3e', 'white', '#e23e3e']
                  )
                : interpolateColor(
                    indexDecimal.value,
                    [index - 1, index, index + 1],
                    ['white', '#e23e3e', 'white']
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

const Example = React.forwardRef(
  ({ route, navigation, emptyContacts, ...props }, ref) => {
    const colorScheme = useColorScheme();
    const { id } = route.params;

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);

    const {
      isLoading,
      recipes,
      userDetails,
      setisLoading,
      fetchNewUser,
      newUserDetails,
      newRecipes,
    } = React.useContext(UserContext);

    const [currentUser, setCurrentUser] = useState({});

    let details = userDetails;

    async function checkUser() {
      if (id !== userDetails.userId) {
        setisLoading(true);
        await fetchNewUser(id);
        setCurrentUser(newUserDetails);
        //details = newUserDetails;
        setisLoading(false);
      } else {
        //details = userDetails;
        setCurrentUser(userDetails);
      }
    }

    function resetRoute() {
      if (id !== userDetails.userId) {
        navigation.dispatch({
          ...CommonActions.setParams({ id: userDetails.userId }),
          source: route.key,
        });
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Home',
          })
        );
      }
    }

    useEffect(() => {
      checkUser();
    }, [id, userDetails.userId]);

    const renderItem = ({ item }) => <VideoRecipe data={item} />;

    const renderItem1 = ({ item }) => <ImageRecipe data={item} />;

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

    let profileLayout;

    if (isLoading) {
      profileLayout = (
        <View style={{ marginTop: 100 }}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      console.log(recipes);
      profileLayout = (
        <>
          <Tabs.Container
            ref={ref}
            {...props}
            renderHeader={() => (
              <Header
                profile={currentUser}
                loading={isLoading}
                same={id == userDetails.userId ? true : false}
                onPress={handlePresentModalPress}
                reset={resetRoute}
              />
            )}
            renderTabBar={MyTabBar2}
          >
            <Tabs.Tab name='Video' label={makeLabel('Video')}>
              <Tabs.FlatList
                data={recipes.filter((e) => e.type === 'video')}
                renderItem={renderItem}
                keyExtractor={identity}
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  backgroundColor:
                    colorScheme === 'light'
                      ? theme.NEUTRAL0_COLOR
                      : theme.NEUTRAL100_COLOR,
                }}
              />
            </Tabs.Tab>
            <Tabs.Tab name='Recipe' label={makeLabel('Recipe')}>
              {/* <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView> */}
              <Tabs.FlatList
                data={recipes.filter((e) => e.type === 'recipe')}
                renderItem={renderItem1}
                keyExtractor={identity}
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  backgroundColor:
                    colorScheme === 'light'
                      ? theme.NEUTRAL0_COLOR
                      : theme.NEUTRAL100_COLOR,
                }}
              />
            </Tabs.Tab>
          </Tabs.Container>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text>Awesome 🎉</Text>
              <View>
                <TouchableOpacity
                  onPress={() => signOut(auth)}
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    marginTop: 20,
                    fontSize: theme.FONT_SIZE_H3,
                    fontFamily: theme.FONT_REGULAR,
                    color: theme.NEUTRAL40_COLOR,
                  }}
                >
                  <Text>SignOut</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetModal>
          <StatusBar style='dark' />
        </>
      );
    }

    return profileLayout;
  }
);

export default Example;
