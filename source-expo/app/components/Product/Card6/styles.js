import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  imageBackgroundCard3: {
    width: Utils.scaleWithPixel(40),
    height: Utils.scaleWithPixel(40),
  },
  dateTime: {
    paddingVertical: 5,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  textMore: {
    paddingLeft: 15,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
