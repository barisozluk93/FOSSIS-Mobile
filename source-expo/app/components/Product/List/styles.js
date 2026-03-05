import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageWishlist: {
    width: Utils.scaleWithPixel(120),
    height: Utils.scaleWithPixel(120),
    borderRadius: 8,
  },
  salePercentList: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  costPrice: { paddingHorizontal: 8, textDecorationLine: 'line-through' },
  viewText: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  containLoading: {
    flexDirection: 'row',
  },
});
