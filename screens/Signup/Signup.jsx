import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

export default function Signup({ navigation }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <View style={{ marginTop: 60, width: '50%' }}>
        <Text
          style={{
            color: theme.NEUTRAL90_COLOR,
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_H5,
          }}
        >
          Create an account
        </Text>
        <Text
          style={{
            color: theme.NEUTRAL80_COLOR,
            fontFamily: theme.FONT_REGULAR,
            fontSize: theme.FONT_SIZE_SMALL,
          }}
        >
          Let’s help you set up your account, it won’t take long.
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            color: theme.NEUTRAL90_COLOR,
          }}
        >
          Name
        </Text>
        <TextInput
          style={{
            color: theme.NEUTRAL90_COLOR,
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            marginTop: 5,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderColor: theme.NEUTRAL30_COLOR,
            borderWidth: 1,
            borderRadius: 10,
          }}
          placeholder='Enter Name'
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            color: theme.NEUTRAL90_COLOR,
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            color: theme.NEUTRAL90_COLOR,
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            marginTop: 5,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderColor: theme.NEUTRAL30_COLOR,
            borderWidth: 1,
            borderRadius: 10,
          }}
          placeholder='Enter Email'
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            color: theme.NEUTRAL90_COLOR,
          }}
        >
          Password
        </Text>
        <TextInput
          style={{
            color: theme.NEUTRAL90_COLOR,
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            marginTop: 5,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderColor: theme.NEUTRAL30_COLOR,
            borderWidth: 1,
            borderRadius: 10,
          }}
          placeholder='Enter Password'
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            color: theme.NEUTRAL90_COLOR,
          }}
        >
          Confirm Password
        </Text>
        <TextInput
          style={{
            color: theme.NEUTRAL90_COLOR,
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            marginTop: 5,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderColor: theme.NEUTRAL30_COLOR,
            borderWidth: 1,
            borderRadius: 10,
          }}
          placeholder='Enter Password'
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : theme.PRIMARY50_COLOR}
          style={{ borderRadius: 7 }}
        />
        <Text
          style={{
            marginTop: 20,
            marginLeft: 5,
            color: theme.PRIMARY50_COLOR,
            fontSize: theme.FONT_SIZE_SMALL,
            fontFamily: theme.FONT_REGULAR,
          }}
        >
          Accept Terms & Conditions
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingHorizontal: 32,
          paddingVertical: 16,
          borderRadius: 10,
          marginTop: 25,
          backgroundColor: theme.PRIMARY50_COLOR,
        }}
        onPress={() => navigation.navigate('Tabs')}
      >
        <Text
          style={{
            color: theme.NEUTRAL0_COLOR,
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_BOLD,
            marginRight: 4,
          }}
        >
          Sign Up
        </Text>
        <CustomIcon name='Arrow-Right' size={20} color={theme.NEUTRAL0_COLOR} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 14,
          paddingHorizontal: 60,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: '30%',
            height: 1,
            backgroundColor: theme.NEUTRAL50_COLOR,
          }}
        />
        <Text
          style={{
            color: theme.NEUTRAL50_COLOR,
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
          }}
        >
          Or Sign Up With
        </Text>
        <View
          style={{
            width: '30%',
            height: 1,
            backgroundColor: theme.NEUTRAL50_COLOR,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.NEUTRAL30_COLOR,
            marginHorizontal: 12,
          }}
        >
          <Ionicons name='logo-google' size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.NEUTRAL30_COLOR,
            marginHorizontal: 12,
          }}
        >
          <Ionicons name='logo-facebook' size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_SMALL,
          }}
        >
          Already a member?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text
            style={{
              fontFamily: theme.FONT_BOLD,
              fontSize: theme.FONT_SIZE_SMALL,
              color: theme.PRIMARY50_COLOR,
            }}
          >
            {' '}
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
