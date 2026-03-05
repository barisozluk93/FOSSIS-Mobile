import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 5,
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
