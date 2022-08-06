import { StyleSheet } from 'react-native';
import theme from '../styles/theme.style.js';

export default StyleSheet.create({
  largeButtonText: {
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: theme.FONT_WEIGHT_HEAVY,
  },
  labelContainer: {
    marginTop: 57,
    marginLeft: 85,
  },
  labelText1: {
    fontSize: theme.FONT_SIZE_P,
    color: theme.NEUTRAL0_COLOR,
    fontFamily: theme.FONT_REGULAR,
  },
  labelText2: {
    fontSize: theme.FONT_SIZE_P,
    color: theme.NEUTRAL0_COLOR,
    fontFamily: theme.FONT_BOLD,
  },
});
