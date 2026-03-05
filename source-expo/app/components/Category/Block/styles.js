import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    height: Utils.scaleWithPixel(115),
    borderRadius: 8,
    // opacity: 0.5
  },
  contentIcon: {
    position: 'absolute',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: '100%',
  },
});
