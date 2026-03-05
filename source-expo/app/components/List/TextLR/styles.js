import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: Utils.scaleWithPixel(30),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  image: {
    height: Utils.scaleWithPixel(48),
    width: Utils.scaleWithPixel(48),
    borderRadius: Utils.scaleWithPixel(48) / 2,
  },
  text: {
    textAlign: 'right',
  },
});
