import { StyleSheet, Platform } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  imageBackgroundCard3: {
    width: Utils.scaleWithPixel(60),
    height: Utils.scaleWithPixel(60),
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 220,
    padding: 8,
    borderRadius: 4,
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
  loading: {
    borderRadius: 4,
    height: Utils.scaleWithPixel(60),
  },
  containLoading: {
    width: 220,
  },
});
