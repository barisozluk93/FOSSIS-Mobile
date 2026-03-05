import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
  },
  contain: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 5,
    paddingBottom: 10,
  },
  thumb: { width: 30, height: 30, marginRight: 10 },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 7.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  right: {
    flex: 2.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
