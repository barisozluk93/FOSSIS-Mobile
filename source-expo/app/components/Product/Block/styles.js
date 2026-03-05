import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  imageBackground: {
    height: ((Utils.getWidthDevice() - 40) * 9) / 16,
    width: '100%',
    position: 'relative',
  },
  salePercent: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  costPrice: { paddingHorizontal: 8, textDecorationLine: 'line-through' },
});
