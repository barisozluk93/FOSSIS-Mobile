import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  viewCart: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(80),
    borderRadius: Utils.scaleWithPixel(80 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
