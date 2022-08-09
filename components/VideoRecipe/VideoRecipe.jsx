import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '../../styles/theme.style';
import CustomIcon from '../CustomIcon/CustomIcon';
import styles from '../../styles/styles';
import videoImage from '../../assets/images/video.png';
import { useNavigation } from '@react-navigation/native';

const VideoRecipe = ({ data }) => {
  const navigation = useNavigation();

  return (
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
            {data.cookTime}
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
            {data.rating}
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
            onPress={() =>
              navigation.navigate('RecipeDetail', {
                data: data,
              })
            }
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RecipeDetail', {
              data: data,
            })
          }
        >
          <Text
            style={{
              color: theme.NEUTRAL90_COLOR,
              fontSize: theme.FONT_SIZE_P,
              fontFamily: theme.FONT_BOLD,
            }}
          >
            {data.recipeTitle}
          </Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              id: data.personId,
            })
          }
        >
          <Image source={data.personImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              id: data.personId,
            })
          }
        >
          <Text
            style={{
              color: theme.NEUTRAL40_COLOR,
              fontFamily: theme.FONT_REGULAR,
              fontSize: theme.FONT_SIZE_SMALL,
              marginLeft: 8,
            }}
          >
            By {data.personName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoRecipe;
