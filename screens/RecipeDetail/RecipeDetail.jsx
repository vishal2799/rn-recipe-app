import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import React, { Component, useState } from 'react';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';

export const RecipeDetail = ({ route, navigation }) => {
  const { data } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const toggleMore = () => setShow((show) => !show);

  function onPress() {
    return navigation.goBack();
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 30,
            marginBottom: 12,
          }}
        >
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>

          {/* {show ? (
            <View
              style={{
                height: 100,
                width: 100,
                position: 'absolute',
                right: 70,
                top: 50,
                backgroundColor: 'pink',
                zIndex: 99,
              }}
            >
              <Text>Hi</Text>
            </View>
          ) : (
            <Text></Text>
          )} */}
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
                backgroundColor: theme.NEUTRAL0_COLOR,
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
                color={theme.NEUTRAL100_COLOR}
              />
            </TouchableOpacity>
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
              onPress={toggleMore}
            >
              <CustomIcon
                name='More'
                size={20}
                color={theme.NEUTRAL100_COLOR}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: theme.FONT_BOLD,
              fontSize: theme.FONT_SIZE_H4,
              color: theme.NEUTRAL90_COLOR,
            }}
          >
            {data.recipeTitle}
          </Text>
        </View>
        <View
          style={{ paddingHorizontal: 20, paddingBottom: 14, paddingTop: 12 }}
        >
          <View>
            <Image
              source={data.recipeImage}
              style={{ width: '100%', borderRadius: 10 }}
            />
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
                color: theme.NEUTRAL90_COLOR,
                marginRight: 7,
                marginLeft: 4,
              }}
            >
              {data.rating}
            </Text>
            <Text
              style={{
                fontFamily: theme.FONT_REGULAR,
                fontSize: theme.FONT_SIZE_LABEL,
                color: theme.NEUTRAL40_COLOR,
              }}
            >
              ( {data.reviews} reviews )
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
                <Image source={data.personImage} />
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
                      color: theme.NEUTRAL100_COLOR,
                    }}
                  >
                    {data.personName}
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
                    {data.personLocation}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: theme.PRIMARY50_COLOR,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: theme.FONT_BOLD,
                  fontSize: theme.FONT_SIZE_LABEL,
                  color: theme.NEUTRAL0_COLOR,
                  textAlign: 'center',
                }}
              >
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
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
                color: theme.NEUTRAL90_COLOR,
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
              5 Items
            </Text>
          </View>
          {data.ingredients.map((e) => (
            <View
              style={{
                marginTop: 12,
                borderRadius: 12,
                backgroundColor: theme.NEUTRAL10_COLOR,
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
                    color: theme.NEUTRAL90_COLOR,
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
      </ScrollView>
    </SafeAreaView>
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
