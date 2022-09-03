import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import theme from '../../styles/theme.style';
import CustomIcon from '../CustomIcon/CustomIcon';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/user';

const PopularCard = ({ data }) => {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();
  const { userDetails } = React.useContext(UserContext);

  let saved;

  for (let i = 0; i <= userDetails.saved.length; i++) {
    if (data.id == userDetails.saved[i]) {
      saved = 'Yes';
    }
  }

  const onSave = () => {
    const docRef = doc(db, 'users', userDetails.userId);
    if (!saved) {
      updateDoc(docRef, {
        saved: arrayUnion(data.id),
      })
        .then(() => console.log('saved added'))
        .catch((e) => console.log(e.message));
    } else {
      updateDoc(docRef, {
        saved: arrayRemove(data.id),
      })
        .then(() => console.log('saved deleted'))
        .catch((e) => console.log(e.message));
    }
  };

  return (
    <View style={{ marginRight: 16 }}>
      <View
        style={{
          position: 'relative',
          backgroundColor:
            colorScheme === 'light'
              ? theme.NEUTRAL10_COLOR
              : theme.NEUTRAL90_COLOR,
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
                color:
                  colorScheme === 'light'
                    ? theme.NEUTRAL90_COLOR
                    : theme.NEUTRAL0_COLOR,
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
              color:
                colorScheme === 'light'
                  ? theme.NEUTRAL90_COLOR
                  : theme.NEUTRAL0_COLOR,
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
              style={{ borderRadius: 55, width: 110, height: 110 }}
            />
          </TouchableOpacity>
        </View>
        {userDetails.userId !== data.userId ? (
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
              onPress={() => onSave()}
            >
              <CustomIcon
                name='Bookmark'
                size={16}
                color={saved ? theme.PRIMARY50_COLOR : theme.NEUTRAL90_COLOR}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default PopularCard;
