import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import CustomInput from '../../components/CustomInput/CustomInput';
import * as yup from 'yup';
import { Formik, Field, useField } from 'formik';

const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    //.matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character'
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  check: yup
    .boolean()
    .required('Required')
    .oneOf([true], 'You must accept the terms and conditions.'),
});

export default function Signup({ navigation }) {
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

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          check: false,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={signUpValidationSchema}
      >
        {({
          handleSubmit,
          isValid,
          values,
          setFieldValue,
          errors,
          touched,
          dirty,
        }) => (
          <>
            <Field component={CustomInput} name='name' placeholder='Name' />
            <Field
              component={CustomInput}
              name='email'
              placeholder='Email Address'
              keyboardType='email-address'
            />
            <Field
              component={CustomInput}
              name='password'
              placeholder='Password'
              secureTextEntry
            />
            <Field
              component={CustomInput}
              name='confirmPassword'
              placeholder='Confirm Password'
              secureTextEntry
            />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Checkbox
                value={values.check}
                onValueChange={() => setFieldValue('check', !values.check)}
                color={
                  values.check === true ? '#4630EB' : theme.PRIMARY50_COLOR
                }
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
            {errors.check && touched.check && (
              <Text style={styles.errorText}>{errors.check}</Text>
            )}
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
              disabled={!(isValid && dirty)}
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
              <CustomIcon
                name='Arrow-Right'
                size={20}
                color={theme.NEUTRAL0_COLOR}
              />
            </TouchableOpacity>
          </>
        )}
      </Formik>

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

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});
