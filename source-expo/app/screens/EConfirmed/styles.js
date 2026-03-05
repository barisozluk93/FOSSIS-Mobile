import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  headerView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20,
  },
  viewCart: {
    width: Utils.scaleWithPixel(90),
    height: Utils.scaleWithPixel(90),
    borderRadius: Utils.scaleWithPixel(90 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
