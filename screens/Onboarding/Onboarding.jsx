import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import BackgroundImage from '../../assets/images/Background.png';
import theme from '../../styles/theme.style';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({ navigation }) => {
  useEffect(() => {
    hasOnboarded();
  }, []);

  const hasOnboarded = async () => {
    try {
      const value = await AsyncStorage.getItem('hasOnboarded');
      if (value == 'true') {
        navigation.navigate('Signin');
      }
    } catch (e) {
      // error reading value
      console.log('error hasonboarding');
    }
  };
  const completeOnboarding = async (value) => {
    try {
      await AsyncStorage.setItem('hasOnboarded', 'true');
      navigation.navigate('Signin');
    } catch (e) {
      // saving error
      console.log('onboarding error');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.image}>
        <View style={styles.labelContainer}>
          <CustomIcon name='Star' color='white' size={16} />
          <Text style={styles.label1}> 60k+</Text>
          <Text style={styles.label2}> Premium recipes</Text>
        </View>
        <View style={{ top: '50%' }}>
          <LinearGradient
            // Background Linear Gradient
            colors={['transparent', 'black']}
            style={{ height: '100%' }}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.header}>Let's Cooking</Text>
              <Text style={styles.caption}>Find best recipes for cooking</Text>
              <TouchableOpacity
                onPress={completeOnboarding}
                style={{
                  backgroundColor: theme.PRIMARY50_COLOR,
                  flexDirection: 'row',
                  alignItems: 'center',
                  top: 40,
                  paddingHorizontal: 32,
                  paddingVertical: 16,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: theme.NEUTRAL0_COLOR,
                    fontSize: theme.FONT_SIZE_P,
                    fontFamily: theme.FONT_BOLD,
                    marginRight: 8,
                  }}
                >
                  Start Cooking
                </Text>
                <CustomIcon
                  name='Arrow-Right'
                  size={20}
                  color={theme.NEUTRAL0_COLOR}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    //justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  labelContainer: {
    flexDirection: 'row',
    top: 57,
    justifyContent: 'center',
  },
  label1: {
    fontSize: theme.FONT_SIZE_P,
    color: theme.NEUTRAL0_COLOR,
    fontFamily: theme.FONT_BOLD,
  },
  label2: {
    fontSize: theme.FONT_SIZE_P,
    color: theme.NEUTRAL0_COLOR,
    fontFamily: theme.FONT_REGULAR,
  },
  contentContainer: {
    top: 60,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  header: {
    fontFamily: theme.FONT_BOLD,
    fontSize: theme.FONT_SIZE_HEADING,
    color: theme.NEUTRAL0_COLOR,
    textAlign: 'center',
  },
  caption: {
    fontFamily: theme.FONT_REGULAR,
    fontSize: theme.FONT_SIZE_P,
    color: theme.NEUTRAL0_COLOR,
  },
});

export default Onboarding;
