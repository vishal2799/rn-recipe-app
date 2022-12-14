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
import CustomInput from '../../components/CustomInput/CustomInput';
import * as yup from 'yup';
import { Formik, Field, useField } from 'formik';
import { db, auth } from '../../config/Firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Signin({ navigation }) {
  const [err, setErr] = useState(null);
  const onSignInPress = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      setErr(error.message);
    }
    // signInWithEmailAndPassword(auth, values.email, values.password)
    //   .then((response) => {
    //     navigation.navigate('Tabs');

    //     // Signed in
    //     // const userId = response.user.uid;
    //     // const docRef = doc(db, 'users', userId);
    //     // getDoc(docRef)
    //     //   .then((docSnap) => {
    //     //     if (!docSnap.exists()) {
    //     //       alert('User does not exist anymore.');
    //     //       return;
    //     //     } else {
    //     //       alert('Not working');
    //     //       const user = docSnap.data();
    //     //       navigation.navigate('Tabs', { user });
    //     //     }
    //     //   })
    //     //   .catch((err) => {
    //     //     alert(err);
    //     //   });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      {!!err && (
        <View
          style={{
            marginTop: 30,
            padding: 10,
            color: '#fff',
            backgroundColor: '#D54826FF',
          }}
        >
          <Text style={{ color: '#fff' }}>{err}</Text>
        </View>
      )}

      <View style={{ marginTop: 94 }}>
        <Text
          style={{
            color: theme.NEUTRAL90_COLOR,
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_H3,
          }}
        >
          Hello
        </Text>
        <Text
          style={{
            color: theme.NEUTRAL80_COLOR,
            fontFamily: theme.FONT_REGULAR,
            fontSize: theme.FONT_SIZE_H5,
          }}
        >
          Welcome Back!
        </Text>
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => onSignInPress(values)}
        validationSchema={signInValidationSchema}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <>
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
            <TouchableOpacity>
              <Text
                style={{
                  marginTop: 20,
                  color: theme.PRIMARY50_COLOR,
                  fontSize: theme.FONT_SIZE_SMALL,
                  fontFamily: theme.FONT_REGULAR,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
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
              onPress={handleSubmit}
              disabled={!(isValid && dirty)}
              // activate this later disabled={!(isValid && dirty)}
            >
              <Text
                style={{
                  color: theme.NEUTRAL0_COLOR,
                  fontSize: theme.FONT_SIZE_LABEL,
                  fontFamily: theme.FONT_BOLD,
                  marginRight: 4,
                }}
              >
                Sign In
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
          marginTop: 20,
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
          Or Sign in With
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
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontFamily: theme.FONT_BOLD,
            fontSize: theme.FONT_SIZE_SMALL,
          }}
        >
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            style={{
              fontFamily: theme.FONT_BOLD,
              fontSize: theme.FONT_SIZE_SMALL,
              color: theme.PRIMARY50_COLOR,
            }}
          >
            {' '}
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
