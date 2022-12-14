import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import React from 'react';
import avatarImage from '../../assets/images/Avatar.png';
import theme from '../../styles/theme.style';
import { useNavigation } from '@react-navigation/native';

const Creator = ({ data }) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Profile', {
            id: data.authorId,
          })
        }
      >
        <Image
          source={{ uri: data.profilePhotoUrl }}
          style={{ width: 75, height: 75, borderRadius: 50 }}
        />
        <Text
          style={{
            color:
              colorScheme === 'light'
                ? theme.NEUTRAL90_COLOR
                : theme.NEUTRAL0_COLOR,
            fontSize: theme.FONT_SIZE_SMALL,
            fontFamily: theme.FONT_BOLD,
            width: '50%',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 8,
          }}
        >
          {data.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Creator;
