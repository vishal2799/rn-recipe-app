import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import theme from '../../styles/theme.style';
import RecipeImage from '../../assets/images/create.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
} from 'firebase/firestore';
import { db, storage } from '../../config/Firebase/firebaseConfig';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { Picker } from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input';
import { UserContext } from '../../context/user';
const schema = yup.object().shape({
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string(), //.min(4, 'too short').required('Required'), // these constraints take precedence
        quantity: yup.string(), //.min(3, 'cmon').required('Required'), // these constraints take precedence
      })
    )
    .required('Must have friends'), // these constraints are shown if and only if inner constraints are satisfied
  //.min(3, 'Minimum of 3 friends'),
  title: yup
    .string()
    //.matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Name is required'),
  serves: yup
    .number()
    //.matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Serves is required'),
  cookTime: yup
    .number()
    //.matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Cook time is required'),
});

export const Create = ({ navigation }) => {
  const {
    isLoading,
    categoriesList,
    userDetails,
    setAllRecipes,
    allRecipes,
    recipes,
    setRecipes,
  } = React.useContext(UserContext);
  const [btnDisable, setBtnDisable] = useState(false);
  const [categories, setCategories] = useState(categoriesList);

  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const onSave = async (values) => {
    //alert(values.ingredients);
    //console.log(values);

    // const docRef = doc(db, 'recipes');

    // docRef
    //   .addDoc(data)
    //   .then((_doc) => {
    //     alert('Created');
    //     //setEntityText('');
    //     //Keyboard.dismiss();
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
    setBtnDisable(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', selectedImage.localUri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, uuid());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    const url = await getDownloadURL(fileRef);

    const data = {
      title: values.title,
      ingredients: values.ingredients,
      imageUrl: url,
      cookTime: values.cookTime,
      serves: values.serves,
      userId: userDetails.userId,
      authorName: userDetails.name,
      authorPhoto: userDetails.profilePhotoUrl,
      id: uuid(),
      type: values.type,
      category: values.categories,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'recipes'), data);
    setAllRecipes([...allRecipes, data]);
    setRecipes([...recipes, data]);
    setBtnDisable(false);
    navigation.navigate('Home');
    // const metadata = {
    //   contentType: 'image/jpeg',
    // };

    // let filename = selectedImage.localUri.split('/').pop();

    // const imageRef = ref(storage, filename);

    // uploadBytesResumable(imageRef, selectedImage.localUri, metadata).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    //   console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    //   getDownloadURL(snapshot.ref).then((url) => {
    //     console.log('File available at', url);
    //     // ...
    //   });
    // });
    console.log(url);
  };

  function checkIngredient(Ingredients) {
    let add;
    for (let index = 0; index < Ingredients.length; index++) {
      const element = Ingredients[index];
      const isEmpty = Object.values(element).every(
        (x) => x === null || x === ''
      );
      if (isEmpty) {
        add = false;
      } else {
        add = true;
      }
    }
    return add;
  }

  let layout;
  if (isLoading) {
    layout = (
      <View style={{ marginTop: 70 }}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    layout = (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ScrollView style={{ backgroundColor: 'white' }}>
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
                onPress={() => navigation.navigate('Home')}
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
              Create Recipe
            </Text>
          </View>
          <View
            style={{ paddingHorizontal: 20, paddingBottom: 14, paddingTop: 12 }}
          >
            <Formik
              initialValues={{
                ingredients: [{ name: '', quantity: '' }],
                title: '',
                type: 'video',
                categories: 'All',
                serves: 0,
                cookTime: 0,
              }}
              validationSchema={schema}
              onSubmit={(values) => onSave(values)}
            >
              {({
                errors,
                touched,
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                isValid,
                dirty,
                setFieldValue,
              }) => (
                <View>
                  {/* <Field as='select' name='color'>
                  <option value='red'>Red</option>
                  <option value='green'>Green</option>
                  <option value='blue'>Blue</option>
                </Field> */}
                  {/* <View>
                  <TouchableOpacity
                    onPress={openImagePickerAsync}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Pick a photo</Text>
                  </TouchableOpacity>
                </View> */}
                  <View>
                    {selectedImage !== null ? (
                      <Image
                        source={{ uri: selectedImage.localUri }}
                        style={{ width: '100%', height: 200, borderRadius: 10 }}
                      />
                    ) : (
                      <Image
                        source={RecipeImage}
                        style={{ width: '100%', borderRadius: 10 }}
                      />
                    )}
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
                    <View
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: theme.NEUTRAL0_COLOR,
                          borderRadius: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={openImagePickerAsync}
                      >
                        <CustomIcon
                          name='Edit'
                          size={20}
                          color={theme.PRIMARY50_COLOR}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.SearchContainer}>
                    <TextInput
                      name='title'
                      placeholder='Enter recipe title'
                      style={styles.textInput}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      keyboardType='email-address'
                    />
                  </View>
                  {errors.title && touched.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}
                  <View>
                    <View
                      style={{
                        marginTop: 12,
                        borderRadius: 12,
                        backgroundColor: theme.NEUTRAL10_COLOR,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                      }}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <CustomIcon
                          name='Clock'
                          size={20}
                          color={theme.PRIMARY50_COLOR}
                          style={{
                            padding: 8,
                            backgroundColor: theme.NEUTRAL0_COLOR,
                            borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: theme.FONT_BOLD,
                            fontSize: theme.FONT_SIZE_P,
                            color: theme.NEUTRAL90_COLOR,
                            marginLeft: 16,
                          }}
                        >
                          Serves
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        {/* <Text
                        style={{
                          fontFamily: theme.FONT_REGULAR,
                          fontSize: theme.FONT_SIZE_LABEL,
                          color: theme.NEUTRAL40_COLOR,
                          marginRight: 8,
                        }}
                      >
                        1
                      </Text> */}
                        <NumericInput
                          step={1}
                          minValue={0}
                          //onChange={handleChange('serves')}
                          onChange={(v) => {
                            setFieldValue('serves', v);
                          }}
                          value={values.serves}
                        />
                        <TouchableOpacity style={{ marginLeft: 10 }}>
                          <CustomIcon
                            name='Arrow-Right'
                            size={24}
                            color={theme.NEUTRAL100_COLOR}
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.serves && touched.serves && (
                        <Text style={styles.errorText}>{errors.serves}</Text>
                      )}
                    </View>
                    <View
                      style={{
                        marginTop: 12,
                        borderRadius: 12,
                        backgroundColor: theme.NEUTRAL10_COLOR,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                      }}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <CustomIcon
                          name='Clock'
                          size={20}
                          color={theme.PRIMARY50_COLOR}
                          style={{
                            padding: 8,
                            backgroundColor: theme.NEUTRAL0_COLOR,
                            borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: theme.FONT_BOLD,
                            fontSize: theme.FONT_SIZE_P,
                            color: theme.NEUTRAL90_COLOR,
                            marginLeft: 16,
                          }}
                        >
                          Cook time
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        {/* <Text
                        style={{
                          fontFamily: theme.FONT_REGULAR,
                          fontSize: theme.FONT_SIZE_LABEL,
                          color: theme.NEUTRAL40_COLOR,
                          marginRight: 8,
                        }}
                      >
                        1
                      </Text> */}
                        <NumericInput
                          step={10}
                          minValue={0}
                          //onChange={handleChange('serves')}
                          onChange={(v) => {
                            setFieldValue('cookTime', v);
                          }}
                          value={values.cookTime}
                        />
                        <TouchableOpacity style={{ marginLeft: 10 }}>
                          <CustomIcon
                            name='Arrow-Right'
                            size={24}
                            color={theme.NEUTRAL100_COLOR}
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.cookTime && touched.cookTime && (
                        <Text style={styles.errorText}>{errors.cookTime}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.SearchContainer}>
                    <Picker
                      selectedValue={values.type}
                      onValueChange={handleChange('type')}
                    >
                      <Picker.Item label='Video' value='video' />
                      <Picker.Item label='Recipe' value='recipe' />
                    </Picker>
                  </View>
                  <View style={styles.SearchContainer}>
                    <Picker
                      selectedValue={values.categories}
                      onValueChange={handleChange('categories')}
                    >
                      {categories.map((e) => (
                        <Picker.Item label={e.name} value={e.name} />
                      ))}
                    </Picker>
                  </View>
                  <View
                    style={{
                      paddingBottom: 14,
                      paddingTop: 22,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: theme.FONT_BOLD,
                        fontSize: theme.FONT_SIZE_H5,
                        color: theme.NEUTRAL100_COLOR,
                      }}
                    >
                      Ingredients
                    </Text>
                    <FieldArray
                      name='ingredients'
                      render={(arrayHelpers) => (
                        <View>
                          {values.ingredients.map((ingredient, index) => (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                                marginBottom: 15,
                              }}
                            >
                              <View
                                style={[
                                  styles.SearchContainer,
                                  { width: '50%' },
                                ]}
                              >
                                <TextInput
                                  name={`ingredients[${index}].name`}
                                  onChangeText={handleChange(
                                    `ingredients[${index}].name`
                                  )}
                                  onBlur={handleBlur(
                                    `ingredients[${index}].name`
                                  )}
                                  value={values.ingredients[index].name}
                                  placeholder='Item Name'
                                  style={styles.SearchField}
                                />
                              </View>
                              <View
                                style={[
                                  styles.SearchContainer,
                                  { width: '35%' },
                                ]}
                              >
                                <TextInput
                                  name={`ingredients[${index}].quantity`}
                                  onChangeText={handleChange(
                                    `ingredients[${index}].quantity`
                                  )}
                                  onBlur={handleBlur(
                                    `ingredients[${index}].quantity`
                                  )}
                                  value={values.ingredients[index].quantity}
                                  placeholder='Quantity'
                                  style={styles.SearchField}
                                />
                              </View>
                              <TouchableOpacity
                                onPress={() => arrayHelpers.remove(index)}
                              >
                                <CustomIcon
                                  name='Minus-Border'
                                  size={24}
                                  color={theme.NEUTRAL100_COLOR}
                                />
                              </TouchableOpacity>
                            </View>
                          ))}
                          {checkIngredient(values.ingredients) ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 16,
                                alignItems: 'center',
                              }}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  arrayHelpers.push({ name: '', quantity: '' })
                                }
                              >
                                <CustomIcon
                                  name='Plus'
                                  size={24}
                                  color={theme.NEUTRAL90_COLOR}
                                />
                              </TouchableOpacity>

                              <Text
                                style={{
                                  fontFamily: theme.FONT_BOLD,
                                  fontSize: theme.FONT_SIZE_P,
                                  color: theme.NEUTRAL90_COLOR,
                                  marginLeft: 4,
                                }}
                              >
                                Add new Ingredient
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 16,
                                alignItems: 'center',
                              }}
                            >
                              <TouchableOpacity
                                disabled={true}
                                onPress={() =>
                                  arrayHelpers.push({ name: '', quantity: '' })
                                }
                              >
                                <CustomIcon
                                  name='Plus'
                                  size={24}
                                  color={theme.NEUTRAL90_COLOR}
                                />
                              </TouchableOpacity>

                              <Text
                                style={{
                                  fontFamily: theme.FONT_BOLD,
                                  fontSize: theme.FONT_SIZE_P,
                                  color: theme.NEUTRAL90_COLOR,
                                  marginLeft: 4,
                                }}
                              >
                                Add new Ingredient
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 32,
                      backgroundColor: theme.PRIMARY50_COLOR,
                      borderRadius: 10,
                      marginBottom: 110,
                      marginTop: 10,
                    }}
                    onPress={handleSubmit}
                    disabled={!(isValid && dirty) || btnDisable}
                  >
                    <Text
                      style={{
                        fontFamily: theme.FONT_BOLD,
                        fontSize: theme.FONT_SIZE_P,
                        color: theme.NEUTRAL0_COLOR,
                        textAlign: 'center',
                      }}
                    >
                      Save my recipes
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return layout;
};

const styles = StyleSheet.create({
  SearchContainer: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: theme.PRIMARY50_COLOR,
    borderWidth: 1,
    borderRadius: 10,
  },
  SearchField: {
    color: theme.NEUTRAL90_COLOR,
    fontSize: theme.FONT_SIZE_LABEL,
    fontFamily: theme.FONT_REGULAR,
  },
});
export default Create;
