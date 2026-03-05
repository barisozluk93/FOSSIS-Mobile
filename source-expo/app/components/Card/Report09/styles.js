import { StyleSheet, Platform } from 'react-native';
import * as Utils from '@/utils';

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
    width: 240,
  },
  viewProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    width: Utils.scaleWithPixel(40),
    height: Utils.scaleWithPixel(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Utils.scaleWithPixel(20),
    marginRight: 5,
  },
});
