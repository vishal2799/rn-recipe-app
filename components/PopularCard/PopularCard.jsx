import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '../../styles/theme.style';
import popularImage from '../../assets/images/popular1.png';
import CustomIcon from '../CustomIcon/CustomIcon';
import { useNavigation } from '@react-navigation/native';

const PopularCard = ({ data }) => {
  const navigation = useNavigation();

  return (
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RecipeDetail', {
                data: data,
              })
            }
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
              {data.title}
            </Text>
          </TouchableOpacity>
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
            {data.cookTime} MINS
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RecipeDetail', {
                data: data,
              })
            }
          >
            <Image
              source={{ uri: data.imageUrl }}
              style={{ borderRadius: 50, width: 90, height: 90 }}
            />
          </TouchableOpacity>
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
            <CustomIcon
              name='Bookmark'
              size={16}
              color={theme.NEUTRAL90_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PopularCard;
