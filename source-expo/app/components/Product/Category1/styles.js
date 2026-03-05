import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    height: Utils.scaleWithPixel(115),
    borderRadius: 8,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { alignItems: 'center' },
});
