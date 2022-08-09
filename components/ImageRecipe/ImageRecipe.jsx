import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '../../styles/theme.style';
import CustomIcon from '../CustomIcon/CustomIcon';
import styles from '../../styles/styles';
import videoImage2 from '../../assets/images/video2.png';

const ImageRecipe = () => {
  return (
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
};

export default ImageRecipe;
