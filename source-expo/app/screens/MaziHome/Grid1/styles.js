import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  imageBackgroundGrid1: {
    width: '100%',
    height: Utils.scaleWithPixel(200),
    borderRadius: 8,
  },
  grid1: {
    width: '50%',
    paddingVertical: 10,
  },
  imageLoading: {
    borderRadius: 8,
  },
  imageView: {
    position: 'relative',
  },
  iconView: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 30,
    height: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
