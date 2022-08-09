import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import recentImage from '../../assets/images/Recent1.png';
import theme from '../../styles/theme.style';
import { useNavigation } from '@react-navigation/native';

const RecentCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RecipeDetail', {
          data: data,
        })
      }
    >
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
    </TouchableOpacity>
  );
};

export default RecentCard;
