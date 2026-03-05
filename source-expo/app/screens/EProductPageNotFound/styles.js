import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  viewCart: {
    width: Utils.scaleWithPixel(90),
    height: Utils.scaleWithPixel(90),
    borderRadius: Utils.scaleWithPixel(90 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
