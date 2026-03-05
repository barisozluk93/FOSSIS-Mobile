import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackgroundCard1: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(110),
  },
  containLoading: {
    flexDirection: 'row',
  },
});
