import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  paddingVertical5: {
    paddingVertical: 5,
  },
  imageWishlist: {
    width: Utils.scaleWithPixel(50),
    height: Utils.scaleWithPixel(50),
  },
  viewTitle: { paddingHorizontal: 5, flex: 1 },
});
