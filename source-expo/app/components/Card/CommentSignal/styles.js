import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  viewContainer: {
    // paddingHorizontal: 10,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: Utils.scaleWithPixel(40),
  },
  image: {
    height: Utils.scaleWithPixel(40),
    width: Utils.scaleWithPixel(40),
  },
  contentThumbnail: {
    marginTop: 5,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
  },
  thumbnail: {
    height: Utils.scaleWithPixel(100),
    width: '100%',
  },
});
