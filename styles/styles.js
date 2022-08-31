import { StyleSheet } from 'react-native';
import theme from '../styles/theme.style.js';
import { Dimensions } from 'react-native';

const HEADER_HEIGHT = 250;

export default StyleSheet.create({
  HeadingContainer: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    width: '55%',
  },
  Heading: {
    color: theme.NEUTRAL90_COLOR,
    fontFamily: theme.FONT_BOLD,
    fontSize: theme.FONT_SIZE_H4,
  },
  SearchContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  SearchFieldContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: theme.NEUTRAL20_COLOR,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  SearchField: {
    color: theme.NEUTRAL30_COLOR,
    fontSize: theme.FONT_SIZE_LABEL,
    fontFamily: theme.FONT_REGULAR,
    width: '100%',
    left: 12,
  },
  TrendingContainer: {},
  TrendingTop: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CategoryTitle: {
    color: theme.NEUTRAL90_COLOR,
    fontFamily: theme.FONT_BOLD,
    fontSize: theme.FONT_SIZE_H5,
  },
  item: {
    //marginRight: 16,
  },
  video: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  rating: {
    position: 'absolute',
    backgroundColor: theme.NEUTRAL30_COLOR,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    left: 8,
    top: 8,
  },
  duration: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  play: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
  save: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  video2: {
    position: 'relative',
    width: '100%',
    minWidth: 300,
    height: 200,
    marginBottom: 20,
  },
  videoImage: {
    position: 'absolute',
    width: '100%',
    borderRadius: 10,
  },
  duration2: {
    position: 'absolute',
    right: 16,
    bottom: 8,
  },
  details: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    width: '50%',
  },
  listTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 8,
  },
  textTab: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: theme.FONT_BOLD,
    color: theme.PRIMARY50_COLOR,
  },
  btnTabActive: {
    backgroundColor: theme.PRIMARY50_COLOR,
  },
  textTabActive: {
    color: theme.NEUTRAL0_COLOR,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  itemLogo: {
    padding: 15,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemBody: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemStatus: {
    backgroundColor: 'pink',
    paddingHorizontal: 6,
    justifyContent: 'center',
    right: 12,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
  itemstyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
    borderRadius: 10,
  },
});
