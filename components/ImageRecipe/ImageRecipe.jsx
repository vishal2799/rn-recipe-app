import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '../../styles/theme.style';
import CustomIcon from '../CustomIcon/CustomIcon';
import styles from '../../styles/styles';
import videoImage2 from '../../assets/images/video2.png';
import { useNavigation } from '@react-navigation/native';

const ImageRecipe = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.video2}>
        <Image
          source={{ uri: data.imageUrl }}
          style={{ width: '100%', height: 200, borderRadius: 10 }}
        />
        <View style={styles.details}>
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
                fontSize: theme.FONT_SIZE_P,
                color: theme.NEUTRAL0_COLOR,
              }}
            >
              {data.title}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: theme.FONT_REGULAR,
              fontSize: theme.FONT_SIZE_SMALL,
              color: theme.NEUTRAL0_COLOR,
            }}
          >
            {data.ingredients.length} Ingredients | {data.cookTime} min
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
