import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 15,
    // height: Utils.scaleWithPixel(60)
  },
  image: {
    height: Utils.scaleWithPixel(40),
    width: Utils.scaleWithPixel(40),
    borderRadius: Utils.scaleWithPixel(40) / 2,
  },
  text: {
    // textAlign: "right",
    textTransform: 'uppercase',
  },
});
