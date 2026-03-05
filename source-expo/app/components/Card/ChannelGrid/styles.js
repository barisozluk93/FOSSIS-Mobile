import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 10,
  },
  contentRate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: Utils.scaleWithPixel(110),
    height: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
  marginVertical3: {
    marginVertical: 3,
  },
  imageWishlist: {
    width: Utils.scaleWithPixel(100),
    height: Utils.scaleWithPixel(100),
  },
  loading: {
    width: Utils.scaleWithPixel(100),
  },
});
