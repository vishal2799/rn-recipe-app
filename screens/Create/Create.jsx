import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, { Component } from 'react';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import RecipeImage from '../../assets/images/create.png';
import IconNoodles from '../../assets/images/Icon-Noodles.png';

export const Create = () => {
  const [text, onChangeText] = React.useState(
    'Bento lunch box ideas for work|'
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View
          style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 12 }}
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
                backgroundColor: theme.NEUTRAL0_COLOR,
                borderRadius: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
            Create Recipe
          </Text>
        </View>
        <View
          style={{ paddingHorizontal: 20, paddingBottom: 14, paddingTop: 12 }}
        >
          <View>
            <Image
              source={RecipeImage}
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
            <View
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: theme.NEUTRAL0_COLOR,
                  borderRadius: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomIcon
                  name='Edit'
                  size={20}
                  color={theme.PRIMARY50_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.SearchContainer}>
            <TextInput
              onChangeText={onChangeText}
              value={text}
              placeholder='Search recipes'
              style={styles.SearchField}
            />
          </View>
          {[1, 2].map((e) => (
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
                <CustomIcon
                  name='Clock'
                  size={20}
                  color={theme.PRIMARY50_COLOR}
                  style={{
                    padding: 8,
                    backgroundColor: theme.NEUTRAL0_COLOR,
                    borderRadius: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: theme.FONT_BOLD,
                    fontSize: theme.FONT_SIZE_P,
                    color: theme.NEUTRAL90_COLOR,
                    marginLeft: 16,
                  }}
                >
                  Bread
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
                  1
                </Text>
                <TouchableOpacity>
                  <CustomIcon
                    name='Arrow-Right'
                    size={24}
                    color={theme.NEUTRAL100_COLOR}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{ paddingHorizontal: 20, paddingBottom: 14, paddingTop: 12 }}
        >
          <Text
            style={{
              fontFamily: theme.FONT_BOLD,
              fontSize: theme.FONT_SIZE_H5,
              color: theme.NEUTRAL100_COLOR,
            }}
          >
            Ingredients
          </Text>
          {[1, 2].map((e) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <View style={[styles.SearchContainer, { width: '50%' }]}>
                <TextInput
                  onChangeText={onChangeText}
                  value={text}
                  placeholder='Search recipes'
                  style={styles.SearchField}
                />
              </View>
              <View style={[styles.SearchContainer, { width: '35%' }]}>
                <TextInput
                  onChangeText={onChangeText}
                  value={text}
                  placeholder='Search recipes'
                  style={styles.SearchField}
                />
              </View>
              <TouchableOpacity>
                <CustomIcon
                  name='Minus-Border'
                  size={24}
                  color={theme.NEUTRAL100_COLOR}
                />
              </TouchableOpacity>
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <View style={[styles.SearchContainer, { width: '50%' }]}>
              <TextInput
                onChangeText={onChangeText}
                placeholder='Item Name'
                style={styles.SearchField}
              />
            </View>
            <View style={[styles.SearchContainer, { width: '35%' }]}>
              <TextInput
                onChangeText={onChangeText}
                placeholder='Quantity'
                style={styles.SearchField}
              />
            </View>
            <TouchableOpacity>
              <CustomIcon
                name='Plus-Border'
                size={24}
                color={theme.NEUTRAL100_COLOR}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity>
              <CustomIcon name='Plus' size={24} color={theme.NEUTRAL90_COLOR} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: theme.FONT_BOLD,
                fontSize: theme.FONT_SIZE_P,
                color: theme.NEUTRAL90_COLOR,
                marginLeft: 4,
              }}
            >
              Add new Ingredient
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            paddingHorizontal: 32,
            backgroundColor: theme.PRIMARY50_COLOR,
            borderRadius: 10,
            marginBottom: 120,
            marginHorizontal: 20,
            marginTop: 16,
          }}
        >
          <Text
            style={{
              fontFamily: theme.FONT_BOLD,
              fontSize: theme.FONT_SIZE_P,
              color: theme.NEUTRAL0_COLOR,
              textAlign: 'center',
            }}
          >
            Save my recipes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SearchContainer: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: theme.PRIMARY50_COLOR,
    borderWidth: 1,
    borderRadius: 10,
  },
  SearchField: {
    color: theme.NEUTRAL90_COLOR,
    fontSize: theme.FONT_SIZE_LABEL,
    fontFamily: theme.FONT_REGULAR,
  },
});
export default Create;
