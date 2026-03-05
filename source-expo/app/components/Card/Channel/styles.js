import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: Utils.scaleWithPixel(60),
    height: Utils.scaleWithPixel(60),
    borderRadius: 8,
  },
  icon: {
    color: BaseColor.grayColor,
  },
});
