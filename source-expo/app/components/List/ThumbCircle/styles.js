import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  },
  thumb: { width: 48, height: 48, marginRight: 10 },
  content: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
