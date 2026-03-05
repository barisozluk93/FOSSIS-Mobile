import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
  },
  contentRate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: Utils.scaleWithPixel(110),
    height: Utils.scaleWithPixel(80),
  },
  marginVertical5: {
    marginVertical: 5,
  },
  imageWishlist: {
    width: Utils.scaleWithPixel(60),
    height: Utils.scaleWithPixel(60),
    borderRadius: 8,
  },
});
