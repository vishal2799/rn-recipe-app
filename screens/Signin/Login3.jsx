import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  friends: yup
    .array()
    //   .of(
    //     Yup.object().shape({
    //       name: Yup.string().min(4, 'too short').required('Required'), // these constraints take precedence
    //       salary: Yup.string().min(3, 'cmon').required('Required'), // these constraints take precedence
    //     })
    //   )
    .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
    .min(3, 'Minimum of 3 friends'),
});

const Login3 = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginTop: 70 }}>Login3</Text>
      <Formik
        initialValues={{ friends: ['jared', 'ian', 'brent'] }}
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
              <View>
                {values.friends && values.friends.length > 0 ? (
                  values.friends.map((friend, index) => (
                    <View key={index}>
                      <TextInput
                        name={`friends.${index}`}
                        onChangeText={handleChange(`friends[${index}]`)}
                        onBlur={handleBlur(`friends[${index}]`)}
                        value={values.friends[index]}
                      />
                      <TouchableOpacity
                        onPress={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        <Text>-</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <TouchableOpacity onPress={() => arrayHelpers.push('')}>
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
