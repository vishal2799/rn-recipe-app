import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  friends: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().min(4, 'too short').required('Required'), // these constraints take precedence
        age: yup.string().min(3, 'cmon').required('Required'), // these constraints take precedence
      })
    )
    .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
    .min(3, 'Minimum of 3 friends'),
});

const Login3 = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginTop: 70 }}>Login3</Text>
      <Formik
        initialValues={{ friends: [{ name: '', age: '' }] }}
        validationSchema={schema}
        onSubmit={(values) =>
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500)
        }
        render={({ values, handleBlur, handleChange, handleSubmit }) => (
          <FieldArray
            name='friends'
            render={(arrayHelpers) => (
              <View style={{ marginTop: 30 }}>
                {values.friends && values.friends.length > 0 ? (
                  values.friends.map((friend, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        marginBottom: 30,
                        justifyContent: 'space-between',
                        width: 300,
                      }}
                    >
                      <TextInput
                        name={`friends[${index}].name`}
                        onChangeText={handleChange(`friends[${index}].name`)}
                        onBlur={handleBlur(`friends[${index}].name`)}
                        value={values.friends[index].name}
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          padding: 10,
                          width: '50%',
                        }}
                        placeholder='Enter Name'
                      />
                      <TextInput
                        name={`friends[${index}].age`}
                        onChangeText={handleChange(`friends[${index}].age`)}
                        onBlur={handleBlur(`friends[${index}].age`)}
                        value={values.friends[index].age}
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          padding: 10,
                          width: '50%',
                        }}
                        placeholder='Enter Age'
                      />
                      {/* {values.friends[index] !== '' ? (
                        <Text>-</Text>
                      ) : (
                        <Text>+</Text>
                      )} */}

                      <TouchableOpacity
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          padding: 5,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        onPress={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        <Text style={{ textAlign: 'center' }}>-</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        style={{
                          borderColor: 'black',
                          borderWidth: 1,
                          padding: 5,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        onPress={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        <Text style={{ textAlign: 'center' }}>+</Text>
                      </TouchableOpacity> */}
                    </View>
                  ))
                ) : (
                  <TouchableOpacity
                    onPress={() => arrayHelpers.push({ name: '', age: '' })}
                  >
                    {/* show this when user has removed all friends from the list */}
                    <Text>Add a friend</Text>
                  </TouchableOpacity>
                )}
                {values.friends.indexOf('') === -1 ? (
                  <TouchableOpacity onPress={() => arrayHelpers.push('')}>
                    {/* show this when user has removed all friends from the list */}
                    <Text>Add a friend</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={true}
                    onPress={() => arrayHelpers.push('')}
                  >
                    {/* show this when user has removed all friends from the list */}
                    <Text>Add a friend</Text>
                  </TouchableOpacity>
                )}
                <View>
                  <TouchableOpacity>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      />
    </View>
  );
};

export default Login3;
