import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import theme from '../../styles/theme.style';

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: theme.FONT_SIZE_LABEL,
            fontFamily: theme.FONT_REGULAR,
            color: theme.NEUTRAL90_COLOR,
            textTransform: 'capitalize',
          }}
        >
          {name}
        </Text>
        <TextInput
          style={[
            styles.textInput,
            props.multiline && { height: props.numberOfLines * 40 },
            hasError && styles.errorInput,
          ]}
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    color: theme.NEUTRAL90_COLOR,
    fontSize: theme.FONT_SIZE_LABEL,
    fontFamily: theme.FONT_REGULAR,
    marginTop: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: theme.NEUTRAL30_COLOR,
    borderWidth: 1,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomInput;
