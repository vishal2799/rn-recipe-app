import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useMemo, useCallback } from 'react';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { UserContext } from '../../context/user';
import { doc, arrayUnion, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../config/Firebase/firebaseConfig';

export const RecipeDetail = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const { data } = route.params;
  const { userDetails, setUserDetails, savedRecipes, setSavedRecipes } =
    React.useContext(UserContext);

  const themeContainerStyle =
    colorScheme === 'light' ? theme.NEUTRAL0_COLOR : theme.NEUTRAL90_COLOR;

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

  function onPress() {
    return navigation.goBack();
  }

  let following;

  for (let i = 0; i <= userDetails.following.length; i++) {
    if (data.userId == userDetails.following[i]) {
      following = 'Yes';
    }
  }

  const onFollow = () => {
    const docRef = doc(db, 'users', userDetails.userId);
    if (!following) {
      updateDoc(docRef, {
        following: arrayUnion(data.userId),
      })
        .then(() => {
          console.log('following');
          setUserDetails({
            ...userDetails,
            following: [...userDetails.following, data.userId],
          });
        })
        .catch((e) => console.log(e.message));
    } else {
      updateDoc(docRef, {
        following: arrayRemove(data.userId),
      })
        .then(() => {
          console.log('unfollowing');
          const newFollowing = [...userDetails.following];
          let indexU = newFollowing.findIndex((item) => item == data.userId);
          if (indexU != -1) {
            const newArrayState2 = newFollowing.filter((value, theIndex) => {
              return indexU !== theIndex;
            });
            setUserDetails({ ...userDetails, following: newArrayState2 });
          }
        })
        .catch((e) => console.log(e.message));
    }
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ScrollView
          style={{
            backgroundColor:
              colorScheme === 'light' ? 'white' : theme.NEUTRAL100_COLOR,
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 35,
              marginBottom: 12,
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
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor:
                    colorScheme === 'light'
                      ? theme.NEUTRAL0_COLOR
                      : theme.NEUTRAL90_COLOR,
                  borderRadius: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={onPress}
              >
                <CustomIcon
                  name='Arrow-Left'
                  size={20}
                  color={
                    colorScheme === 'light'
                      ? theme.NEUTRAL100_COLOR
                      : theme.NEUTRAL0_COLOR
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor:
                    colorScheme === 'light'
                      ? theme.NEUTRAL0_COLOR
                      : theme.NEUTRAL90_COLOR,
                  borderRadius: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handlePresentModalPress}
              >
                <CustomIcon
                  name='More'
                  size={20}
                  color={
                    colorScheme === 'light'
                      ? theme.NEUTRAL100_COLOR
                      : theme.NEUTRAL0_COLOR
                  }
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: theme.FONT_BOLD,
                fontSize: theme.FONT_SIZE_H4,
                color:
                  colorScheme === 'light'
                    ? theme.NEUTRAL90_COLOR
                    : theme.NEUTRAL0_COLOR,
              }}
            >
              {data.title}
            </Text>
          </View>
          <View
            style={{ paddingHorizontal: 20, paddingBottom: 14, paddingTop: 12 }}
          >
            <View>
              <Image
                source={{ uri: data.imageUrl }}
                style={{ width: '100%', height: 200, borderRadius: 10 }}
              />
              {data.type == 'video' ? (
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
                    <CustomIcon
                      name='Play'
                      size={20}
                      color={theme.NEUTRAL0_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <CustomIcon name='Star' color={theme.RATING100_COLOR} size={12} />
              <Text
                style={{
                  fontFamily: theme.FONT_BOLD,
                  fontSize: theme.FONT_SIZE_LABEL,
                  color:
                    colorScheme === 'light'
                      ? theme.NEUTRAL90_COLOR
                      : theme.NEUTRAL0_COLOR,
                  marginRight: 7,
                  marginLeft: 4,
                }}
              >
                4, 5
              </Text>
              <Text
                style={{
                  fontFamily: theme.FONT_REGULAR,
                  fontSize: theme.FONT_SIZE_LABEL,
                  color: theme.NEUTRAL40_COLOR,
                }}
              >
                ( 200 reviews )
              </Text>
            </View>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Profile', {
                      id: data.personId,
                    })
                  }
                >
                  <Image
                    source={{ uri: data.authorPhoto }}
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                  />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Profile', {
                        id: data.personId,
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: theme.FONT_SIZE_P,
                        fontFamily: theme.FONT_BOLD,
                        color:
                          colorScheme === 'light'
                            ? theme.NEUTRAL100_COLOR
                            : theme.NEUTRAL0_COLOR,
                      }}
                    >
                      {data.authorName}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row' }}>
                    <CustomIcon
                      name='Location'
                      color={theme.PRIMARY50_COLOR}
                      size={16}
                    />
                    <Text
                      style={{
                        fontSize: theme.FONT_SIZE_LABEL,
                        fontFamily: theme.FONT_REGULAR,
                        color: theme.NEUTRAL40_COLOR,
                        marginLeft: 4,
                      }}
                    >
                      {data.location}
                    </Text>
                  </View>
                </View>
              </View>
              {userDetails.userId !== data.userId ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: theme.PRIMARY50_COLOR,
                    borderRadius: 10,
                  }}
                  onPress={() => onFollow()}
                >
                  <Text
                    style={{
                      fontFamily: theme.FONT_BOLD,
                      fontSize: theme.FONT_SIZE_LABEL,
                      color: theme.NEUTRAL0_COLOR,
                      textAlign: 'center',
                    }}
                  >
                    {following ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
            <View
              style={{
                marginTop: 12,
                borderRadius: 12,
                backgroundColor:
                  colorScheme === 'light'
                    ? theme.NEUTRAL10_COLOR
                    : theme.NEUTRAL90_COLOR,

                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomIcon
                  name='Clock'
                  size={20}
                  color={theme.PRIMARY50_COLOR}
                  style={{
                    padding: 8,
                    backgroundColor:
                      colorScheme === 'light'
                        ? theme.NEUTRAL0_COLOR
                        : theme.NEUTRAL100_COLOR,
                    borderRadius: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: theme.FONT_BOLD,
                    fontSize: theme.FONT_SIZE_P,
                    color:
                      colorScheme === 'light'
                        ? theme.NEUTRAL90_COLOR
                        : theme.NEUTRAL10_COLOR,

                    marginLeft: 16,
                  }}
                >
                  Cook time
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: theme.FONT_REGULAR,
                    fontSize: theme.FONT_SIZE_LABEL,
                    color: theme.NEUTRAL40_COLOR,
                    marginRight: 8,
                  }}
                >
                  {data.cookTime}
                </Text>

                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <CustomIcon
                    name='Arrow-Right'
                    size={24}
                    color={theme.NEUTRAL100_COLOR}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: 12,
                borderRadius: 12,
                backgroundColor:
                  colorScheme === 'light'
                    ? theme.NEUTRAL10_COLOR
                    : theme.NEUTRAL90_COLOR,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 20,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomIcon
                  name='Clock'
                  size={20}
                  color={theme.PRIMARY50_COLOR}
                  style={{
                    padding: 8,
                    backgroundColor:
                      colorScheme === 'light'
                        ? theme.NEUTRAL0_COLOR
                        : theme.NEUTRAL100_COLOR,
                    borderRadius: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: theme.FONT_BOLD,
                    fontSize: theme.FONT_SIZE_P,
                    color:
                      colorScheme === 'light'
                        ? theme.NEUTRAL90_COLOR
                        : theme.NEUTRAL10_COLOR,
                    marginLeft: 16,
                  }}
                >
                  Serves
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: theme.FONT_REGULAR,
                    fontSize: theme.FONT_SIZE_LABEL,
                    color: theme.NEUTRAL40_COLOR,
                    marginRight: 8,
                  }}
                >
                  {data.serves}
                </Text>

                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <CustomIcon
                    name='Arrow-Right'
                    size={24}
                    color={theme.NEUTRAL100_COLOR}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontSize: theme.FONT_SIZE_H5,
                  fontFamily: theme.FONT_BOLD,
                  color:
                    colorScheme === 'light'
                      ? theme.NEUTRAL90_COLOR
                      : theme.NEUTRAL0_COLOR,
                }}
              >
                Ingredients
              </Text>
              <Text
                style={{
                  fontSize: theme.FONT_SIZE_LABEL,
                  fontFamily: theme.FONT_REGULAR,
                  color: theme.NEUTRAL40_COLOR,
                }}
              >
                {data.ingredients.length} Items
              </Text>
            </View>
            {data.ingredients.map((e) => (
              <View
                style={{
                  marginTop: 12,
                  borderRadius: 12,
                  backgroundColor:
                    colorScheme === 'light'
                      ? theme.NEUTRAL10_COLOR
                      : theme.NEUTRAL90_COLOR,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={e.ingredientImage} />
                  <Text
                    style={{
                      fontFamily: theme.FONT_BOLD,
                      fontSize: theme.FONT_SIZE_P,
                      color:
                        colorScheme === 'light'
                          ? theme.NEUTRAL90_COLOR
                          : theme.NEUTRAL10_COLOR,
                      marginLeft: 16,
                    }}
                  >
                    {e.name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: theme.FONT_REGULAR,
                    fontSize: theme.FONT_SIZE_LABEL,
                    color: theme.NEUTRAL40_COLOR,
                  }}
                >
                  {e.quantity}
                </Text>
              </View>
            ))}
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetModal>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style='light' />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RecipeDetail;
