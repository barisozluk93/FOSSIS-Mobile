import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  cog: {
    // paddingHorizontal: 15
  },
  cardBorder: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderRadius: 10,
    padding: 20,
  },
  containerScrollView: {
    paddingHorizontal: 20,
  },
  uploadBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  progress: {
    borderRadius: 5,
    padding: 20,
    marginVertical: 20,
  },
});
