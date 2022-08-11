import React, { Fragment } from 'react';
import { Field, Form, Formik } from 'formik';
import { string, object, number } from 'yup';
import { View, Text, TextInput, StyleSheet } from 'react-native';
const fields = [
  {
    name: 'firstName',
    label: 'Firstname',
    initialValue: '',
    type: string().required(),
  },
  {
    name: 'lastName',
    label: 'Lastname',
    initialValue: '',
    type: string().required(),
  },
  {
    name: 'email',
    label: 'Email',
    initialValue: '',
    type: string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
  },
  {
    name: 'password',
    label: 'Password',
    initialValue: '',
    type: string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  },
  {
    name: 'age',
    label: 'Age',
    initialValue: 18,
    type: number(),
  },
];

const initialValues = Object.fromEntries(
  fields.map((field) => [field.name, field.initialValue])
);

const SchemaObject = Object.fromEntries(
  fields.map((field) => [field.name, field.type])
);

const UserSchema = object().shape(SchemaObject);

const App = () => (
  <Fragment>
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log({ values })}
      validationSchema={UserSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => {
        return (
          <View>
            {fields.map(({ label, name }, index) => (
              <>
                <TextInput
                  name={name}
                  style={styles.textInput}
                  onChangeText={handleChange([name])}
                  onBlur={handleBlur([name])}
                  value={values.values[name]}
                  //keyboardType='email-address'
                />
                {touched[name] && errors[name] && (
                  <Text style={{ color: 'red' }}>
                    {errors[name]?.toString()}
                  </Text>
                )}
              </>
            ))}
            <View>
              <Button
                onPress={handleSubmit}
                title='LOGIN'
                disabled={!isValid}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  </Fragment>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default App;
