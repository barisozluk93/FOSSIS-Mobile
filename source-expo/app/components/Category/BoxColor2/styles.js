import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  content: {
    height: 160,
    width: '100%',
    borderRadius: 8,
    marginBottom: 0,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 3,
        shadowRadius: 3,
      },
    }),
    justifyContent: 'flex-end',
  },
  container: {
    width: '50%',
  },
  viewIcon: {
    position: 'absolute',
    left: 8,
    top: 8,
    borderRadius: 15,
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
  },

  loading: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  containerLoading: {
    height: 160,
    width: '50%',
  },
});
