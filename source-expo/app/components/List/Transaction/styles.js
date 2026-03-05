import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: Utils.scaleWithPixel(60),
  },
  image: {
    height: Utils.scaleWithPixel(48),
    width: Utils.scaleWithPixel(48),
    borderRadius: Utils.scaleWithPixel(48) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'right',
  },
});
