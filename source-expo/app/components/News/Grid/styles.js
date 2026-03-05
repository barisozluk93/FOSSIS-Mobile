import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '50%',
  },
  content: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 0,
  },
  imageBackground: {
    height: 120,
    width: '100%',
  },
  viewBackground: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  title: {
    width: '100%',
    paddingTop: 5,
  },
  description: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
});
