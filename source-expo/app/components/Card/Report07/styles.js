import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  content: {
    padding: 10,
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
  },
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
