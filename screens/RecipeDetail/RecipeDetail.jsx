import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import RecipeImage from '../../assets/images/RecipeDetailImage.png';
import AvatarImage from '../../assets/images/Avatar2.png';

export class RecipeDetail extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
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
            How to make french toast
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
              4, 5
            </Text>
            <Text
              style={{
                fontFamily: theme.FONT_REGULAR,
                fontSize: theme.FONT_SIZE_LABEL,
                color: theme.NEUTRAL40_COLOR,
              }}
            >
              ( 300 Reviews )
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
              <Image source={AvatarImage} />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: theme.FONT_SIZE_P,
                    fontFamily: theme.FONT_BOLD,
                    color: theme.NEUTRAL100_COLOR,
                  }}
                >
                  Roberta Anny
                </Text>
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
                    Bali, Indonesia
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
      </SafeAreaView>
    );
  }
}

export default RecipeDetail;
