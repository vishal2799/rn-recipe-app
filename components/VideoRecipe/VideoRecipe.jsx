import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import theme from '../../styles/theme.style';
import CustomIcon from '../CustomIcon/CustomIcon';
import styles from '../../styles/styles';
import videoImage from '../../assets/images/video.png';
import personImage from '../../assets/images/Avatar.png';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/user';
import { db } from '../../config/Firebase/firebaseConfig';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { doc, arrayUnion, updateDoc, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const VideoRecipe = ({ data, width, mr }) => {
  const navigation = useNavigation();

  const { userDetails, setUserDetails, savedRecipes, setSavedRecipes } =
    React.useContext(UserContext);
  //  const navigation = useNavigation();

  function timeConvert(n) {
    var num = +n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    if (rhours < 10) {
      rhours = '0' + rhours;
    }
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rminutes < 10) {
      rminutes = '0' + rminutes;
    }
    return num > 60
      ? rhours + ':' + rminutes + ':' + '00'
      : rminutes + ':' + '00';
  }
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
        .then(() => {
          console.log('saved added');
          setUserDetails({
            ...userDetails,
            saved: [...userDetails.saved, data.id],
          });
          setSavedRecipes([...savedRecipes, data]);
          console.log(savedRecipes);
        })
        .catch((e) => console.log(e.message));
    } else {
      updateDoc(docRef, {
        saved: arrayRemove(data.id),
      })
        .then(() => {
          console.log('saved deleted');
          const svRecipes = [...savedRecipes];
          let index = svRecipes.findIndex((item) => item.id == data.id);
          if (index != -1) {
            const newArrayState = svRecipes.filter((value, theIndex) => {
              return index !== theIndex;
            });
            setSavedRecipes(newArrayState);
          }
          const newSaved = [...userDetails.saved];
          let indexU = newSaved.findIndex((item) => item == data.id);
          if (indexU != -1) {
            const newArrayState2 = newSaved.filter((value, theIndex) => {
              return indexU !== theIndex;
            });
            setUserDetails({ ...userDetails, saved: newArrayState2 });
          }

          // setUserDetails({
          //   ...userDetails,
          //   saved: userDetails.saved.filter((e) => e !== data.id),
          // });
          // setSavedRecipes((current) =>
          //   current.filter((e) => {
          //     return e !== data.id;
          //   })
          // );
        })
        .catch((e) => console.log(e.message));
    }
  };

  return (
    // <View style={{ width: '100%', height: 100 }}>
    //   <Text>Video Recipe</Text>
    // </View>
    <View style={{ marginRight: mr ? mr : 0 }}>
      <View style={styles.video}>
        <Image
          source={{ uri: data.imageUrl }}
          style={{
            width: width ? width : '100%',
            height: 180,
            borderRadius: 10,
          }}
        />
        <View style={styles.duration}>
          <Text
            style={{
              fontFamily: theme.FONT_REGULAR,
              fontSize: theme.FONT_SIZE_SMALL,
              color: theme.NEUTRAL0_COLOR,
              backgroundColor: theme.NEUTRAL50_COLOR,
              paddingVertical: 4,
              width: 55,
              paddingHorizontal: 8,
              textAlign: 'center',
              borderRadius: 8,
            }}
          >
            {timeConvert(data.cookTime)}
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
            4,5
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
        {userDetails.userId !== data.userId ? (
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
              onPress={() => onSave()}
            >
              <CustomIcon
                name='Bookmark'
                size={20}
                color={saved ? theme.PRIMARY50_COLOR : theme.NEUTRAL90_COLOR}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
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
            {data.title}
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
              id: data.authorId,
            })
          }
        >
          <Image
            source={{ uri: data.authorPhoto }}
            style={{ width: 32, height: 32, borderRadius: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              id: data.authorId,
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
            By {data.authorName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoRecipe;
