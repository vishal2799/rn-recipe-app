import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '../../styles/theme.style';
import CustomIcon from '../CustomIcon/CustomIcon';

const Notification = () => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.NEUTRAL10_COLOR,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 10,
        marginBottom: 12,
      }}
    >
      <View>
        <TouchableOpacity
          style={{
            width: 28,
            height: 28,
            backgroundColor: theme.SUCCESS10_COLOR,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomIcon name='Recipe' size={16} color={theme.SUCCESS100_COLOR} />
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            fontSize: theme.FONT_SIZE_SMALL,
            fontFamily: theme.FONT_BOLD,
            color: theme.NEUTRAL90_COLOR,
          }}
        >
          New Recipe!
        </Text>
        <Text
          style={{
            paddingRight: 35,
            fontSize: theme.FONT_SIZE_SMALL,
            fontFamily: theme.FONT_REGULAR,
            color: theme.NEUTRAL40_COLOR,
          }}
        >
          Far far away, behind the word mountains, Far from the countries Far
          far away, behind the word mountains, Far from the countries
        </Text>
      </View>
    </View>
  );
};

export default Notification;
